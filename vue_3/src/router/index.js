import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/pages/index'
import GoodsPage from '@/pages/goods'
import OrderListPage from '@/pages/orderList'
import GoodsNutPage from '@/pages/goods/nut'
import GoodsMeaPage from '@/pages/goods/meat'
import GoodsFruPage from '@/pages/goods/fruit'
import GoodsCakPage from '@/pages/goods/cake'
import DetailPage from '@/pages/detail'

Vue.use(Router)

export default new Router({
	mode:'history',
	routes:[
		{
			path:'/',
			component:IndexPage
		},
		{
			path:'/orderList',
			component:OrderListPage
		},
		{
			path: '/detail:foodId',
			name:"detail",
			component: DetailPage
		},
		{
			path: '/goods',
			component: GoodsPage,
			redirect:'/goods/nut',
			children: [
				{
					path: 'nut',
					component: GoodsNutPage
				},
				{
					path: 'meat',
					component: GoodsMeaPage
				},
				{
					path: 'fruit',
					component: GoodsFruPage
				},
				{
					path: 'cake',
					component: GoodsCakPage,
				}
			]
		}
	]
})
