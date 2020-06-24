// 引入mock.js
const Mock = require('mockjs')
const qs = require('qs')
const Random = Mock.Random

// 模拟登录
const login = function(params) {
	// console.log(loginForm);
	let accessToken = 'token'
	return accessToken
}

// 电器库存
const Inventory = function() {
	let Data = Mock.mock({
		'refrigerator|3-6': [
			{
				'name': '@csentence(2, 4)',
				'value|1-100': 20,
			}
		]
	})
	return Data
}

// // 电器销量
// const sales = function () {
// 	let Data = Mock.mock({
// 		'sales|1-12' : [
// 			{
// 				'name' :  '@csentence(2, 4)',
// 				'data|1-12' : 1,
// 			}
// 		]
// 	})
// }


// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/mk_login', 'post', login)
// 获取冰箱库存
Mock.mock('/getRefrigeratorInventory', 'get',Inventory )
// 获取洗衣机库存
Mock.mock('/getWashingMachineInventory', 'get',Inventory )
// 获取空调库存
Mock.mock('/getAirCconditionerInventory', 'get',Inventory )
// 获取彩电库存
Mock.mock('/getTelevisionInventory', 'get',Inventory )
