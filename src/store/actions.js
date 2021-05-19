import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {//有操作逻辑、异步操作的东西放在actions里面
  //第一个参数默认context
  addCart(context, payload) {
    return new Promise((resolve, reject) => {//在actions里面返回promise
      // payload是新添加的商品
      // find方法的参数是一个函数，找到结果后便不再向下找
      // context参数和store对象比较类似
      let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)

      if(oldProduct) {   
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      }else {                 
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}