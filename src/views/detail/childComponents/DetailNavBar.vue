<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" class="title-item" 
        :class="{active: index == currentIndex}"
        @click="titleClick(index)">
          {{item}}</div>
      </div>
  </nav-bar> 
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()//返回上一步的url
      }
    }
  }
</script>

<style>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
    font-size: 13px;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img{
    margin-top: 11px;
  }
</style>