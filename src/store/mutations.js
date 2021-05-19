import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  //mutation唯一的目的就是修改state中状态
  //mutation中的每个方法尽可能完成的事情比较单一一点
  //第一个参数默认state
  [ADD_COUNTER](state, payload) {// 现在用工具调试的时候，分工明确，方便管理
    payload.count += 1        //看到名字就知道做了什么事情
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true  //默认为true
    payload.count = 1  
    state.cartList.push(payload)  
  }
}