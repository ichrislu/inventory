package controller

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"inventory/model"
	"inventory/service"
	"net/http"
)

func AddCategory(c echo.Context) error {
	var category model.Category
	c.Bind(&category)

	fmt.Println("前", category)
	result, err := service.AddCategory(category)
	fmt.Println("后", result)
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
