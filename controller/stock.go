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

func GetStock(c echo.Context) error {
	provider := c.QueryParam("provider")
	begin := c.QueryParam("begin")
	end := c.QueryParam("end")
	allStr := c.QueryParam("all")

	var all bool
	var err error
	if len(allStr) > 0 {
		if all, err = strconv.ParseBool(allStr); err == nil {
			return c.JSON(http.StatusBadRequest, "参数all取值不正确："+err.Error())
		}
	}

	stocks, err := service.GetStocks(provider, begin, end, all)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, stocks)
}

func EditRemarks(c echo.Context) error {
	_id := c.Param("id")
	id, err := strconv.Atoi(_id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "参数id取值不正确："+err.Error())
	}

	remarks := c.FormValue("remarks")

	if err := service.EditStockRemarks(id, remarks); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
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
