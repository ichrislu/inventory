package service

import (
	"inventory/dao"
	"inventory/database"
	"inventory/model"
)

func AddBrand(brand model.Brand) (model.Brand, error) {
	db := database.DB
	return dao.AddBrand(db, brand)
}

func GetSchema() ([]model.Schema, error) {
	db := database.DB
	categorys, err := dao.GetCategorys(db)

	if err != nil {
		return nil, err
	}

	var schemas []model.Schema

	for _, category := range categorys {
		brands, err := dao.GetBrands(db, category.Id)
		if err != nil {
			return nil, err
		}

		schema := model.Schema{Id: category.Id, Name: category.Name, Brands: brands}
		schemas = append(schemas, schema)
	}

	return schemas, nil
}

func GetBrands(cid int) ([]model.Brand, error) {
	db := database.DB
	return dao.GetBrands(db, cid)
}

func GetBrand(id int) (model.Brand, error) {
	db := database.DB
	return dao.GetBrand(db, id)
}

func DelBrand(brand model.Brand) error {
	db := database.DB
	return dao.DelBrand(db, brand)
}

func EditBrand(brand model.Brand) (model.Brand, error) {
	db := database.DB
	return dao.EditBrand(db, brand)
}
