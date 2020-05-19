package service

import (
	"errors"
	"inventory/dao"
	"inventory/database"
	"inventory/model"
)

func AddStock(stock model.Stock) (model.Stock, error) {
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
	stock.Inventory = stock.Quantity

	if stock.Model == "" {
		return model.Stock{}, errors.New("型号不能为空")
	}

	if stock.Price <= 0 {
		return model.Stock{}, errors.New("价格不能是负数")
	}

	db := database.DB

	return dao.AddStock(db, stock)
}

func GetStocks(provider string, begin string, end string, all bool) ([]model.Stock, error) {
	db := database.DB

	return dao.GetStocks(db, provider, begin, end, all)
}

func EditStockRemarks(id int, remarks string) error {
	db := database.DB
	return dao.EditStockRemarks(db, id, remarks)
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

	if result, err = dao.GetStock(tx, stock.Id); err == nil {
		return model.Stock{}, err
	}

	// 以下内容非零值，则与库中值不同时，则更新

	if stock.Provider != "" && stock.Provider != result.Provider {
		result.Provider = stock.Provider
	}

	if stock.Bid > 0 && stock.Bid != result.Bid {
		result.Bid = stock.Bid
	}

	if stock.Date > 0 && stock.Date != result.Date {
		result.Date = stock.Date
	}

	if stock.Model != "" && stock.Model != result.Model {
		result.Model = stock.Model
	}

	if stock.Quantity > 0 && stock.Quantity != result.Quantity {
		// TODO：算法：当前库存数量 = 新入库数量 - 查出库得出的出库总数量
		// 当前库存数量为负，则报错
		// 当前库存数量为0，则全部卖完（库存为0）
		// 当前库存数量为正数，更新入库数量和库存
		//quantity:=
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
		// TODO：修改价格后，出库表需要重新计算相关利润
		dao.RepairProfit(tx, stock.id, stock.Price)
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
