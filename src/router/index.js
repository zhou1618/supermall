import Vue from 'vue'
import VueRouter from 'vue-router'

// 利用懒加载的方式导入文件
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

//安装插件
Vue.use(VueRouter)
//配置路径和组件之间的映射关系
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

//2.创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router