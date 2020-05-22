package controller

import (
	"github.com/labstack/echo/v4"
	"inventory/model"
	"inventory/service"
	"net/http"
	"strconv"
)

func AddCustomer(c echo.Context) error {
	var customer model.Customer
	if err := c.Bind(&customer); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	result, err := service.AddCustomer(customer)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func EditCustomer(c echo.Context) error {
	var customer model.Customer
	if err := c.Bind(&customer); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	result, err := service.EditCustomer(customer)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func GetCustomer(c echo.Context) error {
	shipper := c.QueryParam("shipper")
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

	customers, err := service.GetCustomers(shipper, begin, end, all)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, customers)
}

func EditCustomerRemarks(c echo.Context) error {
	_id := c.Param("id")
	id, err := strconv.ParseInt(_id, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "参数id取值不正确："+err.Error())
	}

	remarks := c.FormValue("remarks")

	if err := service.EditCustomerRemarks(id, remarks); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}
