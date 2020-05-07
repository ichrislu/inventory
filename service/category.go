package service

import (
	"inventory/dao"
	"inventory/database"
	"inventory/model"
)

func AddCategory(name string) (model.Category, error) {
	category := model.Category{Name: name}

	db := database.DB
	defer db.Close()

	return category, dao.AddCategory(db, category)
}
