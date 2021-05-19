import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import toast from 'components/common/toast/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

//安装插件
Vue.use(toast)//默认会去执行toast对象的install方法

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  //占位符，图片还没加载出来是显示的图片
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

//解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
