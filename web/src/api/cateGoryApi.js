import axios from 'axios'
import { BaseUrl } from '../api/config'


// ------------------------------品牌品类页面------------------------------
// 获取品类,品牌信息
export const getAllCategoryApi = params => {
    return axios.get(`${BaseUrl}/category`, params)
}

// 增加品类
export const addCategoryApi = params => {
    return axios.post(`${BaseUrl}/category`, params)
}

// 增加品牌
export const addBrandByIdApi = params => {
    return axios.post(`${BaseUrl}/category`, params)
}

//删除品类
export const deleteCategoryByIdApi = params => {
    return axios.delete(`${BaseUrl}/category/${params}`)
}

//删除品牌
export const deleteBrandByIdApi = params => {
    return axios.delete(`${BaseUrl}/category/${params}`)
}

