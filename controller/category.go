package controller

import (
	"github.com/labstack/echo/v4"
	"inventory/service"
	"net/http"
)

func AddCategory(c echo.Context) error {
	// 考虑在controller层组装model
	// var category = model.Category
	// c.Bind(&category)

	name := c.FormValue("name")
	category, err := service.AddCategory(name)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, category)
}
