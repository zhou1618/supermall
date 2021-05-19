<template>
  <!-- 封装详情页的轮播图 -->
  <div v-if="topImages.length > 0">
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
  
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {//如果默认值是数组或对象，default必须为函数
          return []
        }
      }
    }
    
  }
</script>

<style>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>