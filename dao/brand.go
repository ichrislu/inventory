package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddBrand(db *gorm.DB, brand model.Brand) (model.Brand, error) {
	return brand, db.Create(&brand).Error
}

func GetBrands(db *gorm.DB, cid int) (brands []model.Brand, err error) {
	return brands, db.Where("cid = ?", cid).Find(&brands).Error
}

func GetBrand(db *gorm.DB, id int) (brand model.Brand, err error) {
	return brand, db.Find(&brand, id).Error
}

func DelBrand(db *gorm.DB, brand model.Brand) (err error) {
	return db.Delete(&brand).Error
}

func EditBrand(db *gorm.DB, brand model.Brand) (model.Brand, error) {
	return brand, db.Save(brand).Error
}
