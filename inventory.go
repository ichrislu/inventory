package main

import (
	"fmt"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	_ "inventory/config"
	"inventory/database"
	_ "inventory/statik"
	"log"
	"os"
	"os/exec"
	"runtime"
	"strings"
	"time"
)

func main() {
	file, err := os.OpenFile("inventory.log", os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal("Failed to log to file, quit now!")
	}
	logrus.SetOutput(file)
	logrus.SetLevel(logrus.InfoLevel)

	router := initRouter()
	go open(getUrl(), 1)

	defer database.DB.Close()

	router.Logger.Fatal(router.Start(viper.GetString("server.address")))
}

// only windows
func open(url string, delay time.Duration) {
	if runtime.GOOS == "windows" {
		time.Sleep(delay * time.Second)

		if err := exec.Command("cmd", "/c", "start", url).Start(); err != nil {
			fmt.Println("open failed", err.Error())
		}
	}
}

func getUrl() string {
	return strings.Join([]string{"http://localhost", viper.GetString("server.address")}, "")
}
