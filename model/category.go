package model

type Category struct {
	Id   int    `gorm:"Column:id;Type:integer;PRIMARY_KEY;AUTO_INCREMENT"`
	Pid  int    `gorm:"Column:pid;Type:integer"`
	Name string `gorm:"Column:name;Type:text"`
}

type Schema struct {
	Id   int    `gorm:"Column:id;Type:integer;PRIMARY_KEY;AUTO_INCREMENT"`
	Pid  int    `gorm:"Column:pid;Type:integer"`
	Name string `gorm:"Column:name;Type:text"`

	Category []Category
}
