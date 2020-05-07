package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddCategory(db *gorm.DB, category model.Category) error {
	return db.Create(&category).Error
}
