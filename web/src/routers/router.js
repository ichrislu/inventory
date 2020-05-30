import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import Category from '../pages/cateGory/index'
// import Brand from '../pages/Brand.vue'
import Stock from '../pages/stock/index'
import OutStock from '../pages/outSock/index'
import Customer from '../pages/customer/index'

//查询界面
// import Demo from '../pages/Demo.vue'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            title: '进销存管理系统',
            redirect : '/category',
            component: Home,
            children: [{
                    path: '/category',
                    title: '品类/品牌',
                    component: Category
                },
                {
                    path: '/stock',
                    title: '库存列表',
                    component: Stock
                },
                {
                    path: '/customer',
                    title: '顾客信息',
                    component: Customer
                },{
                    path: '/outstock',
                    title: '出库列表',
                    component: OutStock
                },

            ]
        }
    ]
})
