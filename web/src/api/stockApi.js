import axios from 'axios'

//---------------------------库存页面------------------------------------
// 获取库存列表数据
export const getStockList = params => { return axios.get('http://localhost/stock', params); }

//查询库存列表
export const searchStock = params => {
    return axios.get('http://localhost/stock',{params : params})
}

//新增库存
export const addNewStock = params => {
    return axios.post('http://localhost/stock', params)
}

//新增备注
// export const addNewRemark = params => {
//     return axios.put('http://localhost/stock/' + )
// }
