package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddCategory(db *gorm.DB, category model.Category) (model.Category, error) {
	return category, db.Create(&category).Error
}

func GetCategory(db *gorm.DB, pid int) (category []model.Category, err error) {
	return category, db.Where("pid=?", pid).Find(&category).Error
}

func DelCategory(db *gorm.DB, category model.Category) (err error) {
	return db.Delete(&category).Error
}
