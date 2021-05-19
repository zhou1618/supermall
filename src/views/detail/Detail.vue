<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <!-- 使用封装的better-scroll组件必须有一个高度才能实现局部滚动 -->
    <scroll class="contnet" 
            ref="scroll" 
            @scroll="contentScrollChange"
            :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :detailParamInfo="detailParamInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
    <!-- <Toast :message="message" :isShow="isShow"/> -->
  </div>
</template>

<script>
  import DetailNavBar from 'views/detail/childComponents/DetailNavBar'
  import DetailSwiper from 'views/detail/childComponents/DetailSwiper'
  import DetailBaseInfo from 'views/detail/childComponents/DetailBaseInfo'
  import DetailShopInfo from 'views/detail/childComponents/DetailShopInfo'
  import DetailGoodsInfo from 'views/detail/childComponents/DetailGoodsInfo'
  import DetailParamInfo from 'views/detail/childComponents/DetailParamInfo'
  import DetailCommentInfo from 'views/detail/childComponents/DetailCommentInfo'
  import DetailBottomBar from 'views/detail/childComponents/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // import Toast from 'components/common/toast/Toast'
 
  import {getDetail, getRecommend, Goods, Shops, GoodsParam} from 'network/detail'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {debounce} from 'common/utils'

  import { mapActions } from 'vuex'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        detailParamInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: null,
        positionY: 0,
        currentIndex: 0,
        message: '',
        isShow: false
      }
    },
    created() {
      // 1.保存iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详细数据，（request函数本身返回promise对象）
      getDetail(this.iid).then((res) => {
        // console.log(res)
        let data = res.result;
        // 1.获取顶部轮播图的数据
        this.topImages = data.itemInfo.topImages

        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取店铺相关的信息
        this.shop = new Shops(data.shopInfo);

        //获取商品详情信息
        this.detailInfo = data.detailInfo;
        // console.log(this.detailInfo);

        //获取商品参数的信息
        this.detailParamInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // console.log(this.detailParamInfo);

        //获取商品评论的信息
        //6.获取评论信息
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
          // console.log(this.commentInfo);
				}

        // this.$nextTick(() => {//数据请求完后调用这个回调函数
          
        // })
      })
      
      // 3.直接请求推荐的信息
      getRecommend().then((res) => {
        this.recommends = res.data.list
        // console.log(res);
      })
      //组件创建完成之后，为themeTops设置防抖函数，并没有执行，在图片加载完后调用执行
      this.themeTopYs = debounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0)//$el可以拿到组件的根元素
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },200)
      
    },
    methods: {
      ...mapActions(['addCart']),//映射actions的方法进来
      imageLoad() {//图片加载完后执行
        this.$refs.scroll.refresh();

        // this.themeTopYs = []

        // this.themeTopYs.push(0)//$el可以拿到组件的根元素
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

        // 调用函数
        this.themeTopYs()
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],1000)
      },
      contentScrollChange(position) {
        this.positionY = -position.y;
        let length = this.themeTopYs.length;//5
        for(let i = 0; i < length - 1; i++) {
          if(this.currentIndex !== i && (this.positionY >= this.themeTopYs[i] && this.positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 300)
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {//获取购物车需要的显示的数据
        const product = {}//利用vuex可以实现数据在多个页面进行共享
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // console.log(product);

        // 2.将商品添加到购物车里
        // this.$store.cartList.push(product)  不要直接修改，通过mutation修改

        this.addCart(product).then(res => {
          //可以把actions里面的方法映射到这里，然后在这里调用，利用mapActions
          // console.log(res);
          // this.message = res
          // this.isShow = true

          // setTimeout(() => {
          //   this.message = ''
          //   this.isShow = false
          // },1500)
          this.$toast.show(res,2500)

          // console.log(this.$toast);
        })

        // this.$store.dispatch('addCart',product).then((res) => {
        //   console.log(res);//提交到actions里的时候，就能确定商品添加成功了
        // })
      }
    },
    mounted() {//$el必须在mounted里面操作，created里面拿不到元素
      
    },
    deactivated() {//离开的时候取消全局事件
      // 详情页没有使用缓存（keep-alive），所以deactivated钩子不生效,之前使用了exclude
    },
    destroyed() {
      // console.log('destroyed');
      // 所以在这里取消事件监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    updated() {//只要有数据更新，就会执行（执行频繁）
      
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 99;
    background-color: #fff;
    /* 给根元素一个高度，如果不给，就是所有内容的高度 */
    height: 100vh;
  }
  .contnet {
    /* 计算局部可滚动的局域 */
    height: calc(100% - 44px - 49px);
    background-color: #fff;
  }
  .detail-nav {
    /* 一般利用相对定位来做一些微调的效果 */
    position: relative;
    /* 这个属性需要定位才生效 */
    z-index: 9;
    background-color: #fff;
  }
</style>