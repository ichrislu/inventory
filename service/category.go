package service

import (
	"errors"
	"inventory/database"
	"inventory/model"
	"inventory/repository"
	"strings"
)

func AddCategory(category model.Category) (model.Category, error) {
	if category.Pid < 0 {
		return model.Category{}, errors.New("品类id不正确")
	}

	category.Name = strings.TrimSpace(category.Name)
	if len(category.Name) <= 0 {
		return model.Category{}, errors.New("类目名不能为空")
	}

	category.Id = GetId()

	db := database.DB
	return repository.AddCategory(db, category)
}

func GetCategory() ([]model.Schema, error) {
	db := database.DB

	var schemas []model.Schema
	categories, err := repository.GetCategories(db, 0)
	if err != nil {
		return nil, err
	}

	for _, category := range categories {
		subCategories, err := repository.GetCategories(db, category.Id)
		if err != nil {
			return nil, err
		}

		schema := model.Schema{Id: category.Id, Name: category.Name, Category: subCategories}
		schemas = append(schemas, schema)
	}

	return schemas, nil
}

func DelCategory(category model.Category) error {
	db := database.DB

	_category, err := repository.GetCategory(db, category.Id)
	if err != nil {
		return err
	}

	if _category.Pid == 0 {
		// 品类
		subCategories, err := repository.GetCategories(db, _category.Id)
		if err != nil {
			return err
		}

		if len(subCategories) > 0 {
			return errors.New("要删除品类，必须先删除所属的所有品牌")
		}
	} else {
		// 品牌
		count, err := repository.GetStockCount(db, _category.Id)
		if err != nil {
			return err
		}

		if count > 0 {
			return errors.New("有入库记录的品牌不能删除")
		}
	}

	return repository.DelCategory(db, category)
}
