import axios from 'axios'
import { BaseUrl } from '../api/config'

// 获取冰箱库存
export const getRefrigeratorInventory = params => {
	return axios.get('/getRefrigeratorInventory')
}
// 获取洗衣机库存
export const getWashingMachineInventory = params => {
	return axios.get('/getWashingMachineInventory')
}
// 获取空调库存
export const getAirCconditionerInventory = params => {
	return axios.get('/getAirCconditionerInventory')
}
// 获取彩电库存
export const getTelevisionInventory = params => {
	return axios.get('/getTelevisionInventory')
}
