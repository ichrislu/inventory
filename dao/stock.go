package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddStock(db *gorm.DB, stock model.Stock) (model.Stock, error) {
	return stock, db.Create(&stock).Error
}

//func GetStock(db *gorm.DB, id int) (category model.Category, err error) {
//	return category, db.Find(&category).Error
//}
//
//func GetCategories(db *gorm.DB, pid int) (categories []model.Category, err error) {
//	return categories, db.Where("pid=?", pid).Find(&categories).Error
//}
//
//func DelCategory(db *gorm.DB, category model.Category) (err error) {
//	return db.Delete(&category).Error
//}
