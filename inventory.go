package main

import (
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	_ "inventory/config"
	"inventory/database"
	_ "inventory/statik"
	"os"
	"os/exec"
	"os/signal"
	"runtime"
	"strings"
)

func main() {
	file, err := os.OpenFile("inventory.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND|os.O_SYNC, 0666)
	if err != nil {
		log.Warn("写入磁盘日志失败：", err)
	} else {
		log.SetOutput(file)
	}

	log.SetLevel(log.InfoLevel)

	router := initRouter()
	defer database.DB.Close()

	go func() {
		err := router.Start(viper.GetString("server.address"))
		if err != nil {
			log.Panic("web服务启动失败：", err)
		}
	}()
	defer router.Close()

	runtime.Gosched()
	open(getUrl())

	handleSignal()
}

// only windows
func open(url string) {
	if runtime.GOOS == "windows" {
		if err := exec.Command("cmd", "/c", "start", url).Start(); err != nil {
			log.Warn("打开浏览器失败：", err)
		}
	}
}

func getUrl() string {
	return strings.Join([]string{"http://localhost", viper.GetString("server.address")}, "")
}

func handleSignal() {
	c := make(chan os.Signal)
	// 监听指定信号
	signal.Notify(c, os.Interrupt, os.Kill)

	//阻塞直至有信号传入
	s := <-c
	log.Info("程序退出，信号：", s)
}
