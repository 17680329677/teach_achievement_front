import Vue from 'vue'
import Vuex from 'vuex'

//引入用户
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  //const state：要设置的全局访问的state对象
  modules: {
    app,  //this.$store.app._____
    user,
    permission
  },
  //const getters：实时监听state值的变化(最新状态)
  getters //this.$store.getters.____
})

export default store
