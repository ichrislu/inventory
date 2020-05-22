package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/rakyll/statik/fs"
	"inventory/controller"
	"log"
	"net/http"
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

	statikFS, err := fs.New()
	if err != nil {
		log.Fatal(err)
	}

	e.GET("/*", echo.WrapHandler(http.StripPrefix("/", http.FileServer(statikFS))))

	e.POST("/category", controller.AddCategory)
	e.GET("/category", controller.GetCategory)
	e.DELETE("/category/:id", controller.DelCategory)

	e.POST("/stock", controller.AddStock)
	e.GET("/stock", controller.GetStock)
	e.PUT("/stock/:id", controller.EditStock)
	e.PUT("/stock/:id/remarks", controller.EditStockRemarks)
	e.DELETE("/stock/:id", controller.DelStock)

	e.POST("/saled", controller.AddSaled)
	e.GET("/saled", controller.GetSaledList)
	e.PUT("/saled/:id/remarks", controller.EditSaledRemarks)
	e.GET("/saled/profit", controller.GetTotalProfit)

	e.POST("/customer", controller.AddCustomer)
	e.PUT("/customer/:id", controller.EditCustomer)
	e.GET("/customer", controller.GetCustomer)
	e.PUT("/customer/:id/remarks", controller.EditCustomerRemarks)

	return e
}
