package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddSaled(db *gorm.DB, saled model.Saled) (model.Saled, error) {
	return saled, db.Create(&saled).Error
}

//func GetTotalProfit(db *gorm.DB) (totalProfit float64, err error) {
//	return count, db.Table("stock").Where("bid=?", bid).Count(&count).Error
//}

//func GetSaledCount(db *gorm.DB, sid int) (count uint, err error) {
//	return stock, db.Where("id = ?", id).Find(&stock).Error
//}

func GetSaledList(db *gorm.DB, shipper string, begin string, end string) (saledList []model.SaledList, err error) {
	db = db.Table("saled").
		Select("saled.id,saled.shipper,saled.date as out_date,saled.sid,saled.price as out_price,saled.quantity,saled.profit,stock.price as in_price,stock.date as in_date,stock.bid,stock.model,stock.provider,saled.remarks").
		Joins("JOIN stock on saled.sid = stock.id").
		Order("saled.date DESC")

	if shipper != "" {
		db = db.Where("shipper like ?", "%"+shipper+"%")
	}

	if len(begin) > 0 && len(end) > 0 {
		db = db.Where("saled.date >= ? and saled.date <= ?", begin, end)
	}

	return saledList, db.Find(&saledList).Error
}

func EditSaledRemarks(db *gorm.DB, id int, remarks string) error {
	return db.Model(model.Saled{}).Where("id = ?", id).Update("remarks", remarks).Error
}

func RepairProfit(db *gorm.DB, sid int, newPrice float64) error {
	return nil
}
