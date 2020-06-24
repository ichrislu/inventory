import axios from 'axios'
import { BaseUrl } from '../api/config'

//---------------------------库存页面------------------------------------
// 获取库存列表数据
export const getStockListApi = params => { return axios.get(`${BaseUrl}/stock`, params); }

//查询库存列表
export const searchStockApi = params => {
    return axios.get(`${BaseUrl}/stock`,{params : params})
}

//新增库存
export const addStockApi = params => {
    return axios.post(`${BaseUrl}/stock`, params)
}

//新增备注
export const addRemarkApi = (id,params) => {
    return axios.put(`${BaseUrl}/stock/${id}/remarks`,params)
}

//修改库存数据
export const editStockApi = (id,params) => {
    return axios.put(`${BaseUrl}/stock/${id}`,params)
}

//一键出库
export const saledApi = params => {
    return axios.post(`${BaseUrl}/saled`, params)
}

//删除库存
export const deleteStockApi = id => {
    return axios.delete(`${BaseUrl}/stock/${id}`)
}

//获取供货人
export const getProviderApi = params => {
    return axios.get(`${BaseUrl}/stock/provider`)
}
