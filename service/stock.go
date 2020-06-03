package service

import (
	"errors"
	"inventory/dao"
	"inventory/database"
	"inventory/model"
	"strings"
)

func AddStock(stock model.Stock) (model.Stock, error) {
	stock.Provider = strings.TrimSpace(stock.Provider)
	if stock.Provider == "" {
		return model.Stock{}, errors.New("供应商不能为空")
	}

	if stock.Bid <= 0 {
		return model.Stock{}, errors.New("品类品牌不正确")
	}

	if stock.Date <= 0 {
		return model.Stock{}, errors.New("入库时间不正确")
	}

	if stock.Quantity <= 0 {
		return model.Stock{}, errors.New("入库数量不正确")
	}

	stock.Model = strings.TrimSpace(stock.Model)
	if stock.Model == "" {
		return model.Stock{}, errors.New("型号不能为空")
	}

	if stock.Price <= 0 {
		return model.Stock{}, errors.New("价格不能是负数")
	}

	stock.Inventory = stock.Quantity
	stock.Remarks = strings.TrimSpace(stock.Remarks)

	stock.Id = GetId()

	db := database.DB

	return dao.AddStock(db, stock)
}

func GetStocks(provider string, begin int, end int, all bool) ([]model.Stock, error) {
	db := database.DB
	return dao.GetStocks(db, provider, begin, end, all)
}

func GetProviders() ([]string, error) {
	db := database.DB
	return dao.GetProviders(db)
}

func EditStockRemarks(id int64, remarks string) error {
	db := database.DB
	return dao.EditStockRemarks(db, id, strings.TrimSpace(remarks))
}

func EditStock(stock model.Stock) (model.Stock, error) {
	if stock.Id <= 0 {
		return model.Stock{}, errors.New("id不正确")
	}

	db := database.DB

	tx := db.Begin()

	var result model.Stock
	var err error
	var priceFlag bool

	if result, err = dao.GetStock(tx, stock.Id); err != nil {
		tx.Rollback()
		return model.Stock{}, err
	}

	// 以下内容非零值，则与库中值不同时，则更新

	stock.Provider = strings.TrimSpace(stock.Provider)
	if stock.Provider == "" {
		return model.Stock{}, errors.New("供应商不能为空")
	}
	if stock.Provider != "" && stock.Provider != result.Provider {
		result.Provider = stock.Provider
	}

	if stock.Bid > 0 && stock.Bid != result.Bid {
		result.Bid = stock.Bid
	}

	if stock.Date > 0 && stock.Date != result.Date {
		result.Date = stock.Date
	}

	stock.Model = strings.TrimSpace(stock.Model)
	if stock.Model == "" {
		return model.Stock{}, errors.New("型号不能为空")
	}
	if stock.Model != "" && stock.Model != result.Model {
		result.Model = stock.Model
	}

	stock.Remarks = strings.TrimSpace(stock.Remarks)
	if stock.Remarks != "" && stock.Remarks != result.Remarks {
		result.Remarks = stock.Remarks
	}

	// 算法：当前库存数量 = 新入库数量 - 查出库得出的出库总数量
	// 当前库存数量为负，则报错
	// 当前库存数量为0，则全部卖完（库存为0）
	// 当前库存数量为正数，更新入库数量和库存
	if stock.Quantity > 0 && stock.Quantity != result.Quantity {
		var saledQuantity model.SaledQuantity
		var err error
		if saledQuantity, err = dao.GetSaledQuantity(tx, stock.Id); err != nil {
			tx.Rollback()
			return model.Stock{}, err
		}

		count := stock.Quantity - saledQuantity.Quantity

		if count < 0 {
			tx.Rollback()
			return model.Stock{}, errors.New("入库数量不能小于已出库的总数量")
		}

		result.Quantity = stock.Quantity
		result.Inventory = count
	}

	if stock.Price > 0 && stock.Price != result.Price {
		result.Price = stock.Price
		priceFlag = true
	}

	if err := dao.EditStock(tx, result); err != nil {
		tx.Rollback()
		return stock, err
	}

	if priceFlag {
		// 修改价格后，出库表需要重新计算相关利润
		if err := dao.RepairProfit(tx, result.Id, result.Price); err != nil {
			tx.Rollback()
			return model.Stock{}, nil
		}
	}

	tx.Commit()

	return result, nil
}

func DelStock(stock model.Stock) error {
	db := database.DB

	result, err := dao.GetStock(db, stock.Id)
	if err != nil {
		return err
	}

	if result.Quantity != result.Inventory {
		return errors.New("已出库的记录不能删除")
	}

	return dao.DelStock(db, stock)
}
