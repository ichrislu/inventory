import axios from 'axios'
import { BaseUrl } from '../api/config'

// ------------------------------------ 库存页面 ------------------------------------
// 获取出库列表数据
export const getOutStockListAPI = params => {
    return axios.get(`${BaseUrl}/saled`)
}

// 查询出库数据
export const searchOutStockAPI = params => {
    return axios.get(`${BaseUrl}/saled`,{params : params})
}

// 新增备注
export const addRemarkAPI = (id, params) => {
    return axios.put(`${BaseUrl}/saled/${id}/remarks`,params)
}
