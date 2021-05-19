// 封装相关的代码
import {request} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend',
  })
}
 
// 整合数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price 
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shops {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    //images可能没有值
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}






// （new）创建一个类实例的时候，把需要初始化的信息通过参数传递过去
// 然后再类中的构造器中进行初始化操作（赋值）,把实例赋值给一个变量
// 这就就可以通过 （对象.属性名） 的方式拿到其中的数据
// 把这个对象传给子组件，就很方便操作了，因为里面的数据就是子组件需要展示的