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

func GetSaled(shipper string, begin string, end string, all bool) ([]model.SaledList, error) {
	db := database.DB
	return dao.GetSaledList(db, shipper, begin, end)
}

func EditSaledRemarks(id int, remarks string) error {
	db := database.DB
	return dao.EditSaledRemarks(db, id, remarks)
}
