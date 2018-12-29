import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

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
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/college',
    component: Layout,
    redirect: '/college/index',
    name: 'collegeinfo',
    meta: { title: '学院', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'college',
        component: () => import('@/views/sadmin_college/collegeInfo'),
        meta: { title: '学院管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/secretary',
    component: Layout,
    redirect: '/secretary/index',
    name: 'secretary',
    meta: { title: '教务秘书', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'manage',
        component: () => import('@/views/sadmin_college/academicSecretary'),
        meta: { title: '教务秘书管理', icon: 'peoples' }
      }
    ]
  },

  {
    path: '/rank',
    component: Layout,
    redirect: '/secretary/bookclass',
    name: 'rank',
    meta: { title: '信息配置', icon: 'nested' },
    children: [
      {
        path: 'bookclass',
        name: 'book',
        component: () => import('@/views/sadmin_college/rank/bookClass'),
        meta: { title: '教材等级配置', icon: 'form' }
      },
      {
        path: 'certificate',
        name: 'certificate',
        component: () => import('@/views/sadmin_college/rank/certificate'),
        meta: { title: '证书等级配置', icon: 'form' }
      },
      {
        path: 'titlerank',
        name: 'title',
        component: () => import('@/views/sadmin_college/rank/titleRank'),
        meta: { title: '教师职称配置', icon: 'form' }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
