package model

type Category struct {
	Id   int    `gorm:"column:id;type:integer;primary_key;auto_increment"`
	Pid  int    `gorm:"column:pid;type:integer"`
	Name string `gorm:"column:name;type:text"`
}

type Schema struct {
	Id   int    `gorm:"column:id;type:integer;primary_key;auto_increment"`
	Pid  int    `gorm:"column:pid;type:integer"`
	Name string `gorm:"column:name;type:text"`

	Category []Category
}
