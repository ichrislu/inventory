package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddStock(db *gorm.DB, stock model.Stock) (model.Stock, error) {
	return stock, db.Create(&stock).Error
}

func GetStockCount(db *gorm.DB, bid int) (count uint, err error) {
	return count, db.Table("stock").Where("bid=?", bid).Count(&count).Error
}

func GetStockList(db *gorm.DB, provider string, begin string, end string) (stockList []model.StockList, err error) {
	db = db.Table("stock").
		Select("stock.id,stock.provider,stock.date,stock.bid,(SELECT c2.name from category c2 where c.pid=c2.id) as category,c.name as brand,stock.model,stock.price,stock.quantity,stock.inventory,stock.remarks").
		Joins("join category c ON stock.bid = c.id").
		Order("inventory desc,date asc")

	if len(provider) > 0 {
		db = db.Where("provider like ?", "%"+provider+"%")
	}

	if len(begin) > 0 && len(end) > 0 {
		db = db.Where("date >= ? and date <= ?", begin, end)
	}

	return stockList, db.Find(&stockList).Error
}

func EditRemarks(db *gorm.DB, id int, remarks string) error {
	return db.Model(model.Stock{}).Update("remarks", remarks).Where("id = ?", id).Error
}

//func DelCategory(db *gorm.DB, category model.Category) (err error) {
//	return db.Delete(&category).Error
//}
