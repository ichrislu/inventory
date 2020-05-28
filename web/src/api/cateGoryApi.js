import axios from 'axios'

// ------------------------------品牌品类页面------------------------------
// 获取分类信息
export const getCate = params => {
    return axios.get('http://localhost/category', params)
}

// 增加分类
export const addCategory = params => {
    return axios.post('http://localhost/category', params)
}

// 增加品牌
export const addBrandById = params => {
    return axios.post('http://localhost/category', params)
}

//删除分类
export const deleteCateById = params => {
    return axios.delete('http://localhost/category/', params)
    // return axios.delete('http://localhost/category/', {params : params})
}

//删除品牌
export const deleteBrandById = params => {
    return axios.delete('http://localhost/category/', params)
}

