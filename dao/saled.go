package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddSaled(db *gorm.DB, saled model.Saled) (model.Saled, error) {
	return saled, db.Create(&saled).Error
}

func GetTotalProfit(db *gorm.DB) (totalProfit float64, err error) {
	return count, db.Table("stock").Where("bid=?", bid).Count(&count).Error
}

func GetSaledCount(db *gorm.DB, sid int) (count uint, err error) {
	return stock, db.Where("id = ?", id).Find(&stock).Error
}

func GetSaledList(db *gorm.DB, shipper string, begin string, end string) (saledList []model.SaledList, err error) {
	db = db.Model(model.Saled{}).
		Select("saled.id,saled.shipper,stock.date,stock.sid,(SELECT c2.name from category c2 where c.pid=c2.id) as category,c.name as brand,stock.model,stock.price,stock.quantity,stock.inventory,stock.remarks").
		Joins("join category c ON stock.bid = c.id").
		Order("inventory desc,date asc")

	if len(provider) > 0 {
		db = db.Where("provider like ?", "%"+provider+"%")
	}

	if len(begin) > 0 && len(end) > 0 {
		db = db.Where("date >= ? and date <= ?", begin, end)
	}

	if !all {
		db = db.Where("inventory > 0")
	}

	return stockList, db.Find(&stockList).Error
}

func RepairProfit(db *gorm.DB, sid int, newPrice float64) error {
	return nil
}
