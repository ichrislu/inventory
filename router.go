package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"inventory/controller"
)

func initRouter() *echo.Echo {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: false,
		MaxAge:           86400,
	}))

	e.POST("/category", controller.AddCategory)
	e.GET("/category", controller.GetCategory)
	e.DELETE("/category/:id", controller.DelCategory)

	e.POST("/stock", controller.AddStock)
	e.GET("/stock", controller.GetStock)
	e.PUT("/stock", controller.EditStock)
	e.PUT("/stock/:id/remarks", controller.EditStockRemarks)
	e.DELETE("/stock/:id", controller.DelStock)

	e.POST("/saled", controller.AddSaled)
	e.GET("/saled", controller.GetSaledList)
	e.PUT("/saled/:id/remarks", controller.EditSaledRemarks)

	return e
}
