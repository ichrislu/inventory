package controller

import (
	"github.com/labstack/echo/v4"
	"inventory/model"
	"inventory/service"
	"net/http"
	"strconv"
)

func AddSaled(c echo.Context) error {
	var saled model.Saled
	if err := c.Bind(&saled); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	result, err := service.AddSaled(saled)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func GetSaledList(c echo.Context) error {
	shipper := c.QueryParam("shipper")
	begin := c.QueryParam("begin")
	end := c.QueryParam("end")

	saledList, err := service.GetSaled(shipper, begin, end)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, saledList)
}

func GetTotalProfit(c echo.Context) error {
	var totalProfit model.Profit
	var err error
	if totalProfit, err = service.GetTotalProfit(); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, totalProfit)
}

func EditSaledRemarks(c echo.Context) error {
	_id := c.Param("id")
	id, err := strconv.ParseInt(_id, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "参数id取值不正确："+err.Error())
	}

	remarks := c.FormValue("remarks")

	if err := service.EditSaledRemarks(id, remarks); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.NoContent(http.StatusOK)
}
