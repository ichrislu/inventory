import axios from 'axios'
import {
    Notification
} from 'element-ui'

// 统一路径
let BaseUrl = 'http://localhost'

export {
    BaseUrl
}


// // 请求拦截器
// axios.interceptors.request.use(function (resp) {
//     // 在发送请求之前做些什么

//     return resp;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });


// 响应拦截  配置请求回来的信息
axios.interceptors.response.use(function (resp) {
    return resp
}, function (error) {

    Notification.error({
        title: '错误',
        message: error.response.data,
        position: 'bottom-right',
    });
    return Promise.reject(error);
})
