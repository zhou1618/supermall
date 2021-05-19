<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- 数组中有多少个元素，就有多少个item -->
      <cart-list-item v-for="(item, index) in cartList" 
                      :key="index" 
                      :product="item"/>
    </scroll>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import Scroll from 'components/common/scroll/Scroll.vue'

  import CartListItem from 'views/cart/childComponents/CartListItem'

  export default {
    components: { 
      Scroll,
      CartListItem
    },
    computed: {//数据在cartList中
      ...mapGetters(['cartList'])//把store对象中的getters方法映射到这里为计算属性
    },
    activated() {//进入组件时触发
      this.$refs.scroll.refresh()
      // console.log('cartList refresh');
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>