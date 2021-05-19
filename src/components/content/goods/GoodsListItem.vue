<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="goods-price">{{goodsItem.price}}</span>
      <span class="collect"></span>
      <span class="goods-collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
      // if(this.$route.path.indexof('/home')) {
      //   this.$bus.$emit('homeItemImageLoad')
      // }else if(this.$route.path.indexof('/detail')) {
      //   this.$bus.$emit('detailItemImageLoad')
      // }
    },
    itemClick() {
      // console.log('333')
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  computed: {
    showImage() {
      // 搞一个计算属性，因为如果这个组件想复用的话，其它地方传过来的数据不一样，取图片方式也不对
      return this.goodsItem.image || this.goodsItem.show.img
      // return this.goodsItem.show.img || this.goodsItem.image
    }
  }
}
</script>

<style scoped>
  .goods-item {
    width: 48%;
    padding-bottom: 50px;
    position: relative;
  }
  .goods-item img {
    width: 100%;
    /* height: 100%; */
    border-radius: 5px;
    vertical-align: middle;
  }
  .goods-item .goods-info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    padding: 5px 0;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
  }
  .goods-info p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-price {
    color: var(--color-high-text);
    margin-right: 18px;
  }
  .collect::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -14px;
    width: 14px;
    height: 14px;
    background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>