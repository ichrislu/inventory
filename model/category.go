package model

type Category struct {
	Id   int    `gorm:"Column:id;Type:integer;PRIMARY_KEY;AUTO_INCREMENT"`
	Name string `gorm:"Column:name;Type:text"`
}
