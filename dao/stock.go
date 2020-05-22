package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddStock(db *gorm.DB, stock model.Stock) (model.Stock, error) {
	return stock, db.Create(&stock).Error
}

func GetStockCount(db *gorm.DB, bid int64) (count uint, err error) {
	return count, db.Table("stock").Where("bid=?", bid).Count(&count).Error
}

func GetStock(db *gorm.DB, id int64) (stock model.Stock, err error) {
	return stock, db.Where("id = ?", id).Find(&stock).Error
}

func GetStocks(db *gorm.DB, provider string, begin string, end string, all bool) (stocks []model.Stock, err error) {
	db = db.Model(model.Stock{}).Order("inventory desc").Order("date asc")

	if len(provider) > 0 {
		db = db.Where("provider like ?", "%"+provider+"%")
	}

	if len(begin) > 0 && len(end) > 0 {
		db = db.Where("date >= ? and date <= ?", begin, end)
	}

	if !all {
		db = db.Where("inventory > 0")
	}

	return stocks, db.Find(&stocks).Error
}

func EditStockRemarks(db *gorm.DB, id int64, remarks string) error {
	return db.Model(model.Stock{}).Where("id = ?", id).Update("remarks", remarks).Error
}

func EditStock(db *gorm.DB, stock model.Stock) error {
	return db.Model(model.Stock{}).Save(stock).Error
}

func EditStockInventory(db *gorm.DB, count int, id int64) error {
	return db.Model(model.Stock{}).Where("id = ?", id).Update("inventory", gorm.Expr("inventory - ?", count)).Error
}

func DelStock(db *gorm.DB, stock model.Stock) (err error) {
	return db.Delete(&stock).Error
}
