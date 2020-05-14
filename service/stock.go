package service

import (
	"inventory/dao"
	"inventory/database"
	"inventory/model"
)

func AddStock(stock model.Stock) (model.Stock, error) {
	db := database.DB
	return dao.AddStock(db, stock)
}

func GetStockList(provider string, begin string, end string) ([]model.StockList, error) {
	db := database.DB

	var stockList []model.StockList
	stockList, err := dao.GetStockList(db, provider, begin, end)
	if err != nil {
		return nil, err
	}

	return stockList, nil
}

func EditRemarks(id int, remarks string) error {
	db := database.DB
	return dao.EditRemarks(db, id, remarks)
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
