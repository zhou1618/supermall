<template>
  <div class="cart-botton-bar">
    <div class="cart-left">
      <!-- 父传子，把这个计算属性传给CheckButton组件，组件根据这个属性决定是否添加类名 -->
      <CheckButton class="select-all" :is-checked="isSelectAll" @click.native="checkClick"></CheckButton>
      <span>全选</span>
    </div>
    <div class="cart-center">
      <span class="total-price">合计: ¥{{totalPrice}}</span>
    </div>
    <div class="cart-right" @click="calcClick">
      <span class="buy-product">去计算({{checkLength}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
      }
    },
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),//把store对象中的getters方法映射成计算属性
      totalPrice() {//计算总价格 
        return this.cartList.filter((item) => {//过滤，返回新的数组
          return item.checked  //返回checked属性为true的item，返回值类型是新的数组
        }).reduce((preValue, item) => { //累加，返回一个最终值
          return preValue + (item.price * item.count)
          //preValue是前一个值，一开始赋值为0
        }, 0).toFixed(2)
      },
      checkLength() {//选择商品的长度
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {//如果全部选中，为true，否则为false
        // !item.checked  拿到没有被选中的商品
        // 如果长度不为0，说明有商品没有被选中，全选按钮状态为false（不选中）
        // 如果长度为0，说明商品都被选中，全选按钮状态为true（选中）
        // 1.filter方法
        // return !(this.cartList.filter(item => !item.checked).length)
        // 2.find方法
        // return !this.cartList.find(item => !item.checked)
        // 3.直接判断
        // return this.cartList.length == this.checkLength
        // this.cartList.length  数组总长度
        // this.checkLength     选中的长度
        // 4.普通遍历
        for(let item of this.cartList) {
          if(!item.checked) {  //如果有商品没有选中，返回false
            return false
          }
        }
        return true        //否则返回true
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {  //全部选中
          this.cartList.forEach(item => item.checked = false);
        }else {            //  部分选中或全部不选中
          this.cartList.forEach(item => item.checked = true);
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
            this.$toast.show('请选择购买的商品',2000) 
        }
    }
    }
  }
</script>

<style scoped>
  .cart-botton-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;

    font-size: 14px;
  }
  .cart-left {
    display: flex;
    width: 60px;
    align-items: center;
    margin-left: 10px;
  }
  .cart-left>span {
    margin-left: 5px;
  }
  .select-all {
    width: 16px;
    height: 16px;
    line-height: 16px;
  }
  .cart-center {
    flex: 1;
    margin-left: 10px;
  }
  .cart-right {
    width: 80px;
    text-align: center;
    background-color: red;
    color: #fff;
  }
</style>