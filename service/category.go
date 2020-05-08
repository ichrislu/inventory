package service

import (
	"inventory/dao"
	"inventory/database"
	"inventory/model"
)

func AddCategory(category model.Category) (model.Category, error) {
	db := database.DB
	return dao.AddCategory(db, category)
}

func GetCategorys() ([]model.Category, error) {
	db := database.DB
	return dao.GetCategorys(db)
}

func GetCategory(id int) (model.Category, error) {
	db := database.DB
	return dao.GetCategory(db, id)
}

func DelCategory(category model.Category) error {
	db := database.DB
	return dao.DelCategory(db, category)
}

func EditCategory(category model.Category) (model.Category, error) {
	db := database.DB
	return dao.EditCategory(db, category)
}
