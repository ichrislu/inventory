package repository

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddCategory(db *gorm.DB, category model.Category) (model.Category, error) {
	return category, db.Create(&category).Error
}

func GetCategory(db *gorm.DB, id int64) (category model.Category, err error) {
	return category, db.Where("id=?", id).Find(&category).Error
}

func GetCategories(db *gorm.DB, pid int64) (categories []model.Category, err error) {
	return categories, db.Where("pid=?", pid).Find(&categories).Error
}

func DelCategory(db *gorm.DB, category model.Category) (err error) {
	return db.Delete(&category).Error
}
