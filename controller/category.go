package controller

import (
	"github.com/labstack/echo/v4"
	"inventory/model"
	"inventory/service"
	"net/http"
)

func AddCategory(c echo.Context) error {
	var category model.Category
	c.Bind(&category)

	result, err := service.AddCategory(category)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func GetCategory(c echo.Context) error {
	category, err := service.GetCategory()

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, category)
}

func DelCategory(c echo.Context) error {
	var category model.Category
	c.Bind(&category)

	err := service.DelCategory(category)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}
