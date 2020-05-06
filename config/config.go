package config

import (
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func init()  {
	viper.AddConfigPath(".")
	viper.SetConfigName("config")
	viper.SetConfigType("toml")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("config read error,%s", err)
	}
}
