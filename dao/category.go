package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddCategory(db *gorm.DB, category model.Category) (model.Category, error) {
	return category, db.Create(&category).Error
}

func GetCategorys(db *gorm.DB) (categorys []model.Category, err error) {
	return categorys, db.Find(&categorys).Error
}

func GetCategory(db *gorm.DB, id int) (category model.Category, err error) {
	return category, db.Find(&category, id).Error
}

func DelCategory(db *gorm.DB, category model.Category) (err error) {
	return db.Delete(&category).Error
}

func EditCategory(db *gorm.DB, category model.Category) (model.Category, error) {
	return category, db.Save(category).Error
}
