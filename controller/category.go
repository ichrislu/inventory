package controller

import (
	"github.com/labstack/echo/v4"
	"inventory/model"
	"inventory/service"
	"net/http"
	"strconv"
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

func GetCategorys(c echo.Context) error {
	categorys, err := service.GetCategorys()

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, categorys)
}

func GetCategory(c echo.Context) error {
	// 尝试Bind方式？
	id, err := strconv.Atoi(c.Param("id"))
	category, err := service.GetCategory(id)

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

func EditCategory(c echo.Context) error {
	var category model.Category
	c.Bind(&category)

	result, err := service.EditCategory(category)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}
