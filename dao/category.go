package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddCategory(db *gorm.DB, category model.Category) (model.Category, error) {
	return category, db.Create(&category).Error
}

func GetCategory(db *gorm.DB) (categorys []model.Category, err error) {
	return categorys, db.Find(&categorys).Error
}

func DelCategory(db *gorm.DB, category model.Category) (err error) {
	return db.Delete(&category).Error
}
