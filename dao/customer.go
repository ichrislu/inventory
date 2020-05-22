package dao

import (
	"github.com/jinzhu/gorm"
	"inventory/model"
)

func AddCustomer(db *gorm.DB, customer model.Customer) (model.Customer, error) {
	return customer, db.Create(&customer).Error
}

func GetCustomer(db *gorm.DB, shipper string, begin int, end int, all bool) (customer []model.Customer, err error) {
	db = db.Model(model.Customer{}).Order("delivery_date desc").Order("sale_date asc")

	if shipper != "" {
		db = db.Where("shipper like ?", "%"+shipper+"%")
	}

	if begin > 0 && end > 0 {
		db = db.Where("delivery_date >= ? and delivery_date <= ?", begin, end)
	}

	if !all {
		db = db.Where("status > 0")
	}

	return customer, db.Find(&customer).Error
}

func EditCustomerRemarks(db *gorm.DB, id int64, remarks string) error {
	return db.Model(model.Customer{}).Where("id = ?", id).Update("remarks", remarks).Error
}

func EditCustomer(db *gorm.DB, customer model.Customer) error {
	return db.Model(model.Customer{}).Save(customer).Error
}
