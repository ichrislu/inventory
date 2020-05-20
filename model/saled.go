package model

type Saled struct {
	Id       int     `gorm:"column:id;type:integer;primary_key;auto_increment"`
	Shipper  string  `gorm:"column:shipper;type:text"`
	Date     int     `gorm:"column:date;type:integer"`
	Sid      int     `gorm:"column:sid;type:integer"`
	Price    float64 `gorm:"column:price;type:real"`
	Quantity int     `gorm:"column:quantity;type:integer"`
	Profit   float64 `gorm:"column:profit;type:real"`
	Remarks  string  `gorm:"column:remarks;type:text"`
}

type SaledList struct {
	Id       int     `gorm:"column:id;type:integer;primary_key;auto_increment"`
	Shipper  string  `gorm:"column:shipper;type:text"`
	OutDate  int     `gorm:"column:out_date;type:integer"`
	Sid      int     `gorm:"column:sid;type:integer"`
	OutPrice float64 `gorm:"column:out_price;type:real"`
	Quantity int     `gorm:"column:quantity;type:integer"`
	Profit   float64 `gorm:"column:profit;type:real"`
	Bid      int     `gorm:"column:bid;type:integer"`
	Model    string  `gorm:"column:model;type:text"`
	InPrice  float64 `gorm:"column:in_price;type:real"`
	Provider string  `gorm:"column:provider;type:text"`
	InDate   int     `gorm:"column:in_date;type:integer"`
	Remarks  string  `gorm:"column:remarks;type:text"`
}

type Profit struct {
	TotalProfit float64 `gorm:"column:TotalProfit;type:real"`
}

type SaledQuantity struct {
	Quantity int `gorm:"column:Quantity;type:integer"`
}
