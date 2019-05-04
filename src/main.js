import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'   //引入VueX “store”可全局引用

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

//var app debug用
var app = new Vue({
  el: '#app',
  router,
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件（vuex）
  store,
  render: h => h(App)
})
