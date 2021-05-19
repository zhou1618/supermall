<template>
  <div class="toast" :class="{showToast: !isShow}">
    {{message}}
  </div>
</template>

<script>
  export default {
    props: {
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration) {
        this.isShow = 'ture';
        this.message = message
        // console.log('-----------');

        setTimeout(() => {
          this.isShow = false;
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    height: 28px;
    width: 130px;
    line-height: 28px;
    font-size: 14px;
    text-align: center;
    color: #fff;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 20px;
  }
  .showToast {
    display: none;
  }
</style>