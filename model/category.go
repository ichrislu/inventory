package model

type Category struct {
	Id   int64  `gorm:"column:id;type:integer;primary_key" json:"Id,string"`
	Pid  int64  `gorm:"column:pid;type:integer" json:"Pid,string"`
	Name string `gorm:"column:name;type:text"`
}

type Schema struct {
	Id   int64  `gorm:"column:id;type:integer;primary_key" json:"Id,string"`
	Pid  int64  `gorm:"column:pid;type:integer" json:"Pid,string"`
	Name string `gorm:"column:name;type:text"`

	Category []Category
}
