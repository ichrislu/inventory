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
	beginStr := c.QueryParam("begin")
	lastStr := c.QueryParam("last")
	limitStr := c.QueryParam("limit")
	endStr := c.QueryParam("end")

	var begin, end, last, limit int
	var err error
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
	if lastStr != "" {
		if last, err = strconv.Atoi(lastStr); err != nil {
			return c.JSON(http.StatusBadRequest, "参数last取值不正确："+err.Error())
		}
	}
	if limitStr != "" {
		if limit, err = strconv.Atoi(limitStr); err != nil {
			return c.JSON(http.StatusBadRequest, "参数limit取值不正确："+err.Error())
		}
	}

	saledList, err := service.GetSaledList(shipper, begin, end, last, limit)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, saledList)
}

func GetSaledShippers(c echo.Context) error {
	var shippers []string
	var err error

	if shippers, err = service.GetSaledShippers(); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, shippers)
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
