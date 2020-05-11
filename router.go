package main

import (
	"github.com/labstack/echo/v4"
	"inventory/controller"
)

func initRouter() *echo.Echo {
	// start server
	e := echo.New()

	// Log 搞定第3方日志后再启用这里
	// e.Use(middleware.Logger())

	// CROS
	//e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
	//	AllowOrigins:     viper.GetStringSlice("cors.allow-origins"),
	//	AllowMethods:     viper.GetStringSlice("cors.allow-methods"),
	//	AllowHeaders:     viper.GetStringSlice("cors.allow-headers"),
	//	AllowCredentials: viper.GetBool("cors.allow-credentials"),
	//	MaxAge:           viper.GetInt("cors.max-age"),
	//}))

	//e.Static("/pic", viper.GetString("upload.path"))

	// 安全认证组
	//admin := e.Group("/admin")
	//admin.Use(middleware.KeyAuth(func(key string, c echo.Context) (bool, error) {
	//	return key == viper.GetString("server.auth-key"), nil
	//}))

	// 认证
	//e.POST("/authenticate", handler.Authenticate)

	// 文章
	//e.GET("/a", handler.GetArticles)
	//e.GET("/a/:aid", handler.GetArticle)
	//e.GET("/t/cloud", handler.TagCloud)
	//admin.POST("/a", handler.AddArticle)
	//admin.PUT("/a/:aid", handler.UpdateArticle)
	//admin.DELETE("/a/:aid", handler.DeleteArticle)
	//admin.POST("/a/t", handler.SetTag)
	//admin.DELETE("/a/t", handler.RemoveTag)
	//admin.POST("/p", handler.UploadFile)
	// admin.DELETE("/p", handler.RemoveFile)
	//admin.GET("/p", handler.ListAll)
	// admin.GET("/p/:folder", handler.ListFiles)
	// e.GET("/p", handler.ListAll)

	e.POST("/category", controller.AddCategory)
	e.GET("/category", controller.GetCategory)
	e.DELETE("/category/:id", controller.DelCategory)

	return e
}
