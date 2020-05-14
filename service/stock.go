package service

import (
	"errors"
	"inventory/dao"
	"inventory/database"
	"inventory/model"
)

func AddStock(stock model.Stock) (model.Stock, error) {
	if stock.Bid <= 0 {
		return _, errors.New("品类品牌不正确")
	}

	if stock.Date <= 0 {
		return _, errors.New("入库时间不正确")
	}

	if stock.Quantity <= 0 {
		return _, errors.New("入库数量不正确")
	}
	stock.Inventory = stock.Quantity

	if len(stock.Model) == 0 {
		return _, errors.New("型号不能为空")
	}

	if stock.Price <= 0 {
		return _, errors.New("价格不能是负数")
	}

	db := database.DB

	return dao.AddStock(db, stock)
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
	if stock.Bid <= 0 {
		return _, errors.New("品类品牌不正确")
	}

	if stock.Date <= 0 {
		return _, errors.New("入库时间不正确")
	}

	if stock.Quantity <= 0 {
		return _, errors.New("入库数量不正确")
	}

	if len(stock.Model) == 0 {
		return _, errors.New("型号不能为空")
	}

	if stock.Price <= 0 {
		return _, errors.New("价格不能是负数")
	}

	data := map[string]interface{}{"Bid": stock.Bid, "Date": stock.Date, "Quantity": stock.Quantity, "Model": stock.Model, "Price": stock.Price}

	db := database.DB

	tx := db.Begin()

	err := dao.EditStock(tx, stock, data)

	if stock.Quantity > 0 {

	}

	return stock, nil
}

//
//func DelCategory(category model.Category) error {
//	db := database.DB
//
//	_category, err := dao.GetCategory(db, category.Id)
//	if err != nil {
//		return err
//	}
//
//	if _category.Pid == 0 {
//		// 品类
//		subCategories, err := dao.GetCategories(db, _category.Id)
//		if err != nil {
//			return err
//		}
//
//		if len(subCategories) > 0 {
//			return errors.New("要删除品类，必须先删除所属的所有品牌")
//		}
//	} else {
//		// 品牌
//	}
//
//	return dao.DelCategory(db, category)
//}
