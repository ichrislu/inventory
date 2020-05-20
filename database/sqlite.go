package database

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/spf13/viper"
	"time"
)

var DB *gorm.DB

func init() {
	var err error

	DB, err = gorm.Open(viper.GetString("database.driver-name"), viper.GetString("database.data-source-name"))
	if err != nil {
		panic(err.Error())
	}
	DB.SingularTable(true)
	DB.LogMode(true)

	_db := DB.DB()
	_db.SetMaxIdleConns(viper.GetInt("database.max-idle-conns"))
	_db.SetMaxOpenConns(viper.GetInt("database.max-open-conns"))
	_db.SetConnMaxLifetime(viper.GetDuration("database.max-lifetime") * time.Second)
}
