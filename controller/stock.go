package controller

import (
	"github.com/labstack/echo/v4"
	"inventory/model"
	"inventory/service"
	"net/http"
	"strconv"
)

func AddStock(c echo.Context) error {
	var stock model.Stock
	c.Bind(&stock)

	result, err := service.AddStock(stock)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func GetStock(c echo.Context) error {
	provider := c.QueryParam("provider")
	begin := c.QueryParam("begin")
	end := c.QueryParam("end")

	stockList, err := service.GetStockList(provider, begin, end)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, stockList)
}

func EditRemarks(c echo.Context) error {
	_id := c.Param("id")
	id, _ := strconv.Atoi(_id)
	remarks := c.QueryParam("remarks")

	err := service.EditRemarks(id, remarks)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.NoContent(http.StatusOK)
}

//func DelCategory(c echo.Context) error {
//	var category model.Category
//	c.Bind(&category)
//
//	err := service.DelCategory(category)
//
//	if err != nil {
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//
//	return c.NoContent(http.StatusOK)
//}
