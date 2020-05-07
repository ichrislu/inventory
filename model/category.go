package model

type Category struct {
	Id   uint32 `gorm:"Column:id;Type:integer;PRIMARY_KEY;AUTO_INCREMENT"`
	Name string `gorm:"Column:name;Type:text"`
}
