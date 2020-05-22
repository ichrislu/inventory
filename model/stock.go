package model

type Stock struct {
	Id        int64   `gorm:"column:id;type:integer;primary_key"`
	Provider  string  `gorm:"column:provider;type:text"`
	Date      int     `gorm:"column:date;type:integer"`
	Bid       int64   `gorm:"column:bid;type:integer"`
	Model     string  `gorm:"column:model;type:text"`
	Price     float64 `gorm:"column:price;type:real"`
	Quantity  int     `gorm:"column:quantity;type:integer"`
	Inventory int     `gorm:"column:inventory;type:integer"`
	Remarks   string  `gorm:"column:remarks;type:text"`
}
