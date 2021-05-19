<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表展示 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-botton-bar></cart-botton-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'  
  import CartList from 'views/cart/childComponents/CartList'
  import CartBottonBar from 'views/cart/childComponents/CartBottonBar'

  import {mapGetters} from 'vuex'  //这个是vuex中的属性，把getters中的方法映射成计算属性

  export default {
    name: 'Cart',
    data() {
      return {
        message: '哈哈哈哈'
      }
    },
    components: {
      NavBar,
      CartList,
      CartBottonBar
    },
    computed: {
      // cartLength() {
        // 如果这个属性用的地方比较多的话，可以封装一个getters
        // return this.$store.state.cartList.lenght  
        // return this.$store.getters.cartLength
      // }
      // 数组用法
      // ...mapGetters(['cartLength','cartList']) //把getters中的方法映射成计算属性
      // 对象用法，可以起别名
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })

    }
  }
</script>

<style>
  .cart {
    height: 100vh;
  }
  .cart-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>