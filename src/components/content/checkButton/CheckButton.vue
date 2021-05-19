<template>
  <div class="check-button" :class="{check: isChecked}" >
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    props: {
      isChecked: {//通过对象模型修改
        type: Boolean,
        default: true 
      }
    }
  }
</script>

<style>
  .check-button {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    /* background-color: skyblue; */
    border: 1px solid #ccc;
  }
  .check {
    background-color: rgb(236, 46, 46);
    border-color: rgb(236, 46, 46);
  }
</style>