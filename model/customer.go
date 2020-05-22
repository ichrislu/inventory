package model

type Customer struct {
	Id           int64  `gorm:"column:id;type:integer;primary_key"`
	Shipper      string `gorm:"column:shipper;type:text"`
	SaleDate     int    `gorm:"column:sale_date;type:integer"`
	DeliveryDate int    `gorm:"column:delivery_date;type:integer"`
	Model        string `gorm:"column:model;type:text"`
	Name         string `gorm:"column:name;type:text"`
	Phone        string `gorm:"column:phone;type:text"`
	Address      string `gorm:"column:address;type:text"`
	Status       int    `gorm:"column:status;type:integer"`
	Remarks      string `gorm:"column:remarks;type:text"`
}
