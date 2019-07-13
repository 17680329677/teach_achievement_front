import Vue from 'vue'    //引入Vue
import Router from 'vue-router'   //引入vue-router

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'  //引入根目录下views中的Layout.vue组件

/* modules */
import sadminRouter from '@/router/modules/sadmin'
import cadminRouter from '@/router/modules/cadmin'
import normalRouter from '@/router/modules/normal'
import studentRouter from '@/router/modules/student'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/error-page/404'), hidden: true },
  { path: '/401', component: () => import('@/views/error-page/401'), hidden: true },


]

export const tempAsyncRouterMap = [   //配置路由，这里是个数组

  { path: '*', redirect: '/404', hidden: true }

]

/*
asyncRouterMap 在 @/store/modules/permission中被调用，将多个动态路由合并成asyncRouterMap。
 */
export const asyncRouterMap = tempAsyncRouterMap.concat(sadminRouter).concat(cadminRouter).concat(normalRouter).concat(studentRouter)


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
