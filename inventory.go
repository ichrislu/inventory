package main

import (
	"errors"
	"fmt"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	_ "inventory/config"
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

	router.Logger.Fatal(router.Start(viper.GetString("server.address")))
}

var commands = map[string]string{
	"windows": "cmd /c start",
	"darwin":  "open",
	"linux":   "xdg-open",
}

func open(uri string, delay time.Duration) error {
	run, ok := commands[runtime.GOOS]
	if !ok {
		return errors.New(fmt.Sprintf("don't know how to open things on %s platform", runtime.GOOS))
	}

	cmd := exec.Command(run, uri)

	time.Sleep(delay * time.Second)

	return cmd.Start()
}

func getUrl() string {
	addr := viper.GetString("server.address")
	args := strings.Split(addr, ":")
	args[0] = "http://localhost"

	return strings.Join(args, ":")
}
