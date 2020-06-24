import axios from 'axios'
import { BaseUrl } from '../api/config'

//------------------------------客户页面API--------------------------
// 获取客户信息列表数据
export const getCustomerListApi = params => {
    return axios.get(`${BaseUrl}/customer`)
}

// 查询客户信息列表
export const searchCustomerApi = params => {
    return axios.get(`${BaseUrl}/customer`, {params:params})
}

// 新增客户信息
export const addCustomerApi = params => {
    return axios.post(`${BaseUrl}/customer`, params)
}

// 修改客户信息
export const editCustomerApi = (id,params) => {
    return axios.put(`${BaseUrl}/customer/${id}`, params)
}

// 新增备注
export const addCustomerRemarkApi = (id,params) => {
    return axios.put(`${BaseUrl}/customer/${id}/remarks`, params)
}

//获取出货人
export const getShipperApi = params => {
    return axios.get(`${BaseUrl}/customer/shipper`)
}
