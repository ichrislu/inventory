package service

import (
	"inventory/core"
)

var node *snowflake.Node

func init() {
	var err error
	node, err = snowflake.NewNode(0)
	if err != nil {
		panic(err.Error())
	}
}

func GetId() int64 {
	return node.Generate().Int64()
}
