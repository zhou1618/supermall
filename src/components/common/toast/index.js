import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  // console.log('执行了obj的install函数');
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.new的方式，根据组件构造器，可以创建出来组件对象
  const toast = new toastConstructor()
  //3.将组件对象，手动挂载到某一个元素上
  // toast.$mount(document.createElement('div'))
  toast.$mount(document.querySelector('.toast'))
  //toast.$el 对应的就是div
  document.body.appendChild(toast.$el)
  //给vue的原型添加$toast属性
  Vue.prototype.$toast = toast;
}

export default obj