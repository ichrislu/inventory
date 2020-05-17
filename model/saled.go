package model

type Saled struct {
	Id      int     `gorm:"Column:id;Type:integer;PRIMARY_KEY;AUTO_INCREMENT"`
	Shipper string  `gorm:"Column:shipper;Type:text"`
	Date    int     `gorm:"Column:date;Type:integer"`
	Sid     int     `gorm:"Column:sid;Type:integer"`
	Price   float64 `gorm:"Column:price;Type:real"`
	Number  int     `gorm:"Column:number;Type:integer"`
	Profit  float64 `gorm:"Column:profit;Type:real"`
	Remarks string  `gorm:"Column:remarks;Type:text"`
}

type SaledList struct {
	Id       int     `gorm:"Column:id;Type:integer;PRIMARY_KEY;AUTO_INCREMENT"`
	Shipper  string  `gorm:"Column:shipper;Type:text"`
	Date     int     `gorm:"Column:date;Type:integer"`
	Sid      int     `gorm:"Column:sid;Type:integer"`
	Category string  `gorm:"column:category;type:text"`
	Brand    string  `gorm:"column:brand;type:text"`
	Model    string  `gorm:"Column:model;Type:text"`
	PriceIn  float64 `gorm:"Column:price-in;Type:real"`
	PriceOut float64 `gorm:"Column:price-out;Type:real"`
	Number   int     `gorm:"Column:number;Type:integer"`
	profit   float64 `gorm:"Column:profit;Type:real"`
	Remarks  string  `gorm:"Column:remarks;Type:text"`
}
