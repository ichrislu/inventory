import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import Category from '../pages/category/index'
import Stock from '../pages/stock/index'
import Saled from '../pages/saled/index'
import Customer from '../pages/customer/index'
import Charts from '../pages/charts/index.vue'
import Login from '../pages/Login.vue'

//处理elementUI 重复点击菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

const router =  new Router({
    routes: [
		{
			path : '/',
			// component : Login
			redirect : '/login'
		},
		{
			path : '/login',
			name : 'Login',
			component : Login
		},
		{
            path: '/home',
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
                    path: '/saled',
                    title: '出库列表',
                    component: Saled
                },{
                    path: '/charts',
                    title: '库存销量图',
                    component: Charts
                },
            ]
		},

    ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫, 判断用户是否登录
// router.beforeEach( (to, from, next ) => {
// 	if (to.path === '/login') {
// 		next();
// 	} else {
// 		let token = sessionStorage.getItem( 'asscenToken')
// 		if( token === null || token === '') {
// 			next('/login');
// 		} else {
// 			next()
// 		}
// 	}
// })

export default router
