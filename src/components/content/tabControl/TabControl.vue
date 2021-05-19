<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
  .tab-control {
    position: relative;
    top: -2px;
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 39px;
    background-color: #fff;
    z-index: 1;
  }

  .tab-control-item {
    margin: 1px;
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    padding: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>