import axios from 'axios'
import { BaseUrl } from '../api/config'

//---------------------------库存页面------------------------------------
// 获取库存列表数据
export const getStockListAPI = params => { return axios.get(`${BaseUrl}/stock`, params); }

//查询库存列表
export const searchStockAPI = params => {
    return axios.get(`${BaseUrl}/stock`,{params : params})
}

//新增库存
export const addStockAPI = params => {
    return axios.post(`${BaseUrl}/stock`, params)
}

//新增备注
export const addRemarkAPI = (id,params) => {
    return axios.put(`${BaseUrl}/stock/${id}/remarks`,params)
}

//修改库存数据
export const editStockAPI = (id,params) => {
    return axios.put(`${BaseUrl}/stock/${id}`,params)
}

//一键出库
export const outStockAPI = params => {
    return axios.post(`${BaseUrl}/saled`, params)
}

//删除库存
export const deleteStockAPI = params => {
    return axios.delete(`${BaseUrl}/stock/${params}`)
}
