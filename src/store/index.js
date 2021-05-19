import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

//这里默认做了这一步，这样所有的组件都可以拿到$store属性
// Vue.prototype.$store = store

// 2.创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations,
  actions,
  getters
})

// 3.挂在到Vue实例上
export default store