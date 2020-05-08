package model

type Brand struct {
	Id   int    `gorm:"Column:id;Type:integer;PRIMARY_KEY;AUTO_INCREMENT"`
	Cid  int    `gorm:"Column:cid;Type:integer"`
	Name string `gorm:"Column:name;Type:text"`
}
