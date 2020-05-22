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
	if err := c.Bind(&stock); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	result, err := service.AddStock(stock)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func EditStock(c echo.Context) error {
	var stock model.Stock
	if err := c.Bind(&stock); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	result, err := service.EditStock(stock)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func GetStock(c echo.Context) error {
	provider := c.QueryParam("provider")
	beginStr := c.QueryParam("begin")
	endStr := c.QueryParam("end")
	allStr := c.QueryParam("all")

	var all bool
	var begin, end int
	var err error
	if allStr != "" {
		if all, err = strconv.ParseBool(allStr); err != nil {
			return c.JSON(http.StatusBadRequest, "参数all取值不正确："+err.Error())
		}
	}
	if beginStr != "" {
		if begin, err = strconv.Atoi(beginStr); err != nil {
			return c.JSON(http.StatusBadGateway, "参数begin取值不正确："+err.Error())
		}
	}
	if endStr != "" {
		if end, err = strconv.Atoi(endStr); err != nil {
			return c.JSON(http.StatusBadRequest, "参数end取值不正确："+err.Error())
		}
	}

	stocks, err := service.GetStocks(provider, begin, end, all)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, stocks)
}

func EditStockRemarks(c echo.Context) error {
	_id := c.Param("id")
	id, err := strconv.ParseInt(_id, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "参数id取值不正确："+err.Error())
	}

	remarks := c.FormValue("remarks")

	if err := service.EditStockRemarks(id, remarks); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func DelStock(c echo.Context) error {
	var stock model.Stock
	c.Bind(&stock)

	err := service.DelStock(stock)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}
