package main

import (
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	_ "inventory/config"
	"log"
	"os"
)

func main() {
	file, err := os.OpenFile("service.log", os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal("Failed to log to file, quit now!")
	}
	logrus.SetOutput(file)
	logrus.SetLevel(logrus.InfoLevel)

	router := initRouter()
	if err := router.Start(viper.GetString("server.address")); err != nil {
		log.Fatal(err)
	}
}
