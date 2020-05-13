package model

type Stock struct {
	Id        int     `gorm:"Column:id;Type:integer;PRIMARY_KEY;AUTO_INCREMENT"`
	Provider  string  `gorm:"Column:provider;Type:string"`
	Date      int     `gorm:"Column:date;Type:integer"`
	Bid       int     `gorm:"Column:bid;Type:integer"`
	Model     string  `gorm:"Column:model;Type:text"`
	Price     float64 `gorm:"Column:price;Type:real"`
	Quantity  int     `gorm:"Column:quantity;Type:integer"`
	Inventory int     `gorm:"Column:inventory;Type:integer"`
	Remarks   string  `gorm:"Column:remarks;Type:text"`
}
