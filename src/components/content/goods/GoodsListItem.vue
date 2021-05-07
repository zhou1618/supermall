<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
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
  }
}
</script>

<style>
  .goods-item {
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }
  .goods-item img {
    width: 100%;
    /* height: 100%; */
    border-radius: 5px;
    vertical-align: middle;
  }
  .goods-info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
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