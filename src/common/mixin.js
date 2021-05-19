import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,200)

      this.itemImgListener = () => {
        refresh()
      }
      //3.监听item中的图片加载完成（这个函数是监听到事件后执行的函数，现在我们要获取到它，对它进行取消），对这个函数进行抽取
      this.$bus.$on('itemImageLoad', this.itemImgListener)
      // console.log('我是混入的内容');
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 300)
    // },
    // contentScroll(position) {
    //   // 1.判断BackTop是否显示
    //   this.isShowBackTop = (-position.y) > 1000
    // }
  }
}