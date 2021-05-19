<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                    class="top-tab-control" 
                    @tabClick="tabClick"
                    ref="tabControl1"
                    v-show="isTabFixed"/>
    <scroll class="content" 
        ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll"
        :pullUpLoad="true"
        @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" 
                    class="tab-control" 
                    @tabClick="tabClick"
                    ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  // 子组件
  import HomeSwiper from './childComponents/HomeSwiper'
  import RecommendView from './childComponents/RecommendView'
  import FeatureView from './childComponents/FeatureView'
  //其它
  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {itemListenerMixin} from 'common/mixin'
  export default {
    name: 'Home',
    //进行混入操作
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        scrollY: 0
      }
    },
    components: { 
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据 
      this.getHomeMultidata()
      // 2.请求多个数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      
    },
    destroyed() {
      // console.log('home-destoryed');
    },
    activated() {
      // console.log('activated');
      this.$refs.scroll.scrollTo(0, this.scrollY, 0)
      this.$refs.scroll.refresh()

      // 监听图片加载完后刷新页面
      this.$bus.$on('itemImageLoad',() => {
          this.$refs.scroll.refresh()
          // console.log('--------');
      })
    },
    deactivated() {
      // 1.保存y值
      this.scrollY = this.$refs.scroll.getScrollY()

      // 2.取消全局事件的监听(第二个参数要传一个函数，要被取消的函数)
      // 不能只传一个参数（事件名称），否则对应名字的所有事件都会被取消
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      
      tabClick(index) {
        // console.log(index);
        switch(index) {
          case 0: 
            this.currentType = 'pop'
            break
          case 1: 
            this.currentType = 'new'
            break
          case 2: 
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImageLoad() {
        //图片加载完成后拿到tabControl距离顶部的位置
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关的代码
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了不让导航跟着一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 43px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .top-tab-control {
    position: relative;
    /* 这个属性必须在定位中使用 */
    z-index: 9;
    margin-top: -px;
  }
</style>