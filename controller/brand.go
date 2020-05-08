package controller

import (
	"github.com/labstack/echo/v4"
	"inventory/model"
	"inventory/service"
	"net/http"
	"strconv"
)

func AddBrand(c echo.Context) error {
	var brand model.Brand
	c.Bind(&brand)

	result, err := service.AddBrand(brand)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func GetSchema(c echo.Context) error {
	schema, err := service.GetSchema()

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, schema)
}

func GetBrands(c echo.Context) error {
	cid, err := strconv.Atoi(c.Param("cid"))
	brands, err := service.GetBrands(cid)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, brands)
}

func GetBrand(c echo.Context) error {
	// 尝试Bind方式？
	id, err := strconv.Atoi(c.Param("id"))
	brand, err := service.GetBrand(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, brand)
}

func DelBrand(c echo.Context) error {
	var brand model.Brand
	c.Bind(&brand)

	err := service.DelBrand(brand)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func EditBrand(c echo.Context) error {
	var brand model.Brand
	c.Bind(&brand)

	result, err := service.EditBrand(brand)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}
