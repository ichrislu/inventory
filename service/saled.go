package service

import (
	"errors"
	"inventory/dao"
	"inventory/database"
	"inventory/model"
)

func AddSaled(saled model.Saled) (model.Saled, error) {
	if saled.Shipper == "" {
		return model.Saled{}, errors.New("出货人不能为空")
	}

	if saled.Sid <= 0 {
		return model.Saled{}, errors.New("入库项不正确")
	}

	if saled.Date <= 0 {
		return model.Saled{}, errors.New("出库时间不正确")
	}

	if saled.Number <= 0 {
		return model.Saled{}, errors.New("出库数量不正确")
	}

	if saled.Price <= 0 {
		return model.Saled{}, errors.New("价格不能是负数")
	}

	db := database.DB
	tx := db.Begin()

	var stock model.Stock
	var err error

	if stock, err = dao.GetStock(tx, saled.Sid); err == nil {
		tx.Rollback()
		return model.Saled{}, err
	}

	if stock.Inventory < saled.Number {
		return model.Saled{}, errors.New("库存数量不足")
	}

	saled.Profit = saled.Price - stock.Price

	// 添加出库记录
	var result model.Saled
	if result, err = dao.AddSaled(tx, saled); err == nil {
		tx.Rollback()
		return model.Saled{}, err
	}

	// 减库存
	dao.EditStockInventory(tx, saled.Number, saled.Sid)

	tx.Commit()
	return result, nil
}

func GetStockList(provider string, begin string, end string, all bool) ([]model.StockList, error) {
	db := database.DB

	var stockList []model.StockList
	stockList, err := dao.GetStockList(db, provider, begin, end, all)
	if err != nil {
		return nil, err
	}

	return stockList, nil
}

func EditRemarks(id int, remarks string) error {
	db := database.DB
	return dao.EditRemarks(db, id, remarks)
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

	}

	if stock.Price > 0 && stock.Price != result.Price {
		result.Price = stock.Price
		priceFlag = true
	}

	if err := dao.EditStock(tx, stock); err != nil {
		tx.Rollback()
		return stock, err
	}

	if priceFlag {
		// TODO：修改价格后，出库表需要重新计算相关利润
	}

	tx.Commit()

	return result, nil
}
