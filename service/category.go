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

func GetCategory() ([]model.Schema, error) {
	db := database.DB

	var schemas []model.Schema
	categorys, err := dao.GetCategory(db, -1)
	if err != nil {
		return nil, err
	}

	for _, category := range categorys {
		subCategorys, err := dao.GetCategory(db, category.Id)
		if err != nil {
			return nil, err
		}

		schema := model.Schema{Id: category.Id, Name: category.Name, Category: subCategorys}
		schemas = append(schemas, schema)
	}

	return schemas, nil
}

func DelCategory(category model.Category) error {
	db := database.DB
	return dao.DelCategory(db, category)
}
