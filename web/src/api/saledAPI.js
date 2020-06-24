import axios from 'axios'
import { BaseUrl } from './config'

// ------------------------------------ 库存页面 ------------------------------------
// 获取出库列表数据 查询出库数据
export const getSaledListApi = params => {
    return axios.get(`${BaseUrl}/saled`,{params : params})
}

// 新增/修改备注
export const editRemarkApi = (id, params) => {
    return axios.put(`${BaseUrl}/saled/${id}/remarks`,params)
}

//获取出货人数据
export const getShipperApi = params => {
    return axios.get(`${BaseUrl}/saled/shipper`)
}
