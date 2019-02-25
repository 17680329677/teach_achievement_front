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
  // 校级管理员路由配置------------------------------------------------------------------
  {
    path: '/college',
    component: Layout,
    redirect: '/college/index',
    name: 'collegeinfo',
    meta: { title: '学院', icon: 'example', roles: ['sadmin'] },
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
    meta: { title: '教务秘书', icon: 'example', roles: ['sadmin'] },
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
    meta: { title: '信息配置', icon: 'nested', roles: ['sadmin'] },
    children: [
      {
        path: 'innovation',
        name: 'innovation',
        component: () => import('@/views/sadmin_college/rank/innovation'),
        meta: { title: '大创等级配置', icon: 'form' }
      },
      {
        path: 'teachreform',
        name: 'teachreform',
        component: () => import('@/views/sadmin_college/rank/teachreform'),
        meta: { title: '教改项目配置', icon: 'form' }
      },
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
      {
        path: 'teacher',
        name: 'teacher',
        component: () => import('@/views/sadmin_college/rank/teacher/index'),
        redirect: '/rank/teacher/title',
        meta: { title: '教师配置', icon: 'form' },
        children: [
          {
            path: 'title',
            name: 'Menu1-1',
            component: () => import('@/views/sadmin_college/rank/teacher/title/index'),
            meta: { title: '教师职称管理' }
          },
          {
            path: 'type',
            name: 'Menu1-2',
            component: () => import('@/views/sadmin_college/rank/teacher/type/index'),
            meta: { title: '教师类型管理' }
          },
        ]
      },
    ]
  },

  {
    path: '/semester',
    component: Layout,
    redirect: '/semester/index',
    name: 'semester',
    meta: { title: '学期管理', icon: 'example', roles: ['sadmin'] },
    children: [
      {
        path: 'index',
        name: 'semestermanage',
        component: () => import('@/views/sadmin_college/semester'),
        meta: { title: '学期配置', icon: 'list' }
      }
    ]
  },

  // 院级教务秘书路由配置----------------------------------------------------------------------
  {
    path: '/department',
    component: Layout,
    redirect: '/department/index',
    name: 'department',
    meta: { title: '教研室(系)管理', icon: 'example', roles: ['cadmin'] },
    children: [
      {
        path: 'index',
        name: 'departmentmanage',
        component: () => import('@/views/cadmin/department'),
        meta: { title: '教研室(系)管理', icon: 'department' }
      }
    ]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/secretary/bookclass',
    name: 'rank',
    meta: { title: '教师管理', icon: 'peoples', roles: ['cadmin'] },
    children: [
      {
        path: 'info',
        name: 'info',
        component: () => import('@/views/cadmin/teacher/teacher_info'),
        meta: { title: '教师信息', icon: 'form' }
      },
      {
        path: 'titlegranted',
        name: 'titlegranted',
        component: () => import('@/views/cadmin/teacher/title_granted'),
        meta: { title: '职称授予', icon: 'form' }
      }
    ]
  },

  {
    path: '/book',
    component: Layout,
    redirect: '/book/index',
    name: 'book',
    meta: { title: '教材出版审核', icon: 'book', roles: ['cadmin'] },
    children: [
      {
        path: 'index',
        name: 'book_published',
        component: () => import('@/views/cadmin/book'),
        meta: { title: '教材出版审核', icon: 'book' }
      }
    ]
  },

  {
    path: '/teach_reform',
    component: Layout,
    redirect: '/teach_reform/index',
    name: 'teach_reform',
    meta: { title: '教改项目', icon: 'project', roles: ['cadmin'] },
    children: [
      {
        path: 'index',
        name: 'teach_reform',
        component: () => import('@/views/cadmin/teach_reform'),
        meta: { title: '教改项目', icon: 'project' }
      }
    ]
  },

  {
    path: '/reform_paper',
    component: Layout,
    redirect: '/reform_paper/index',
    name: 'reform_paper',
    meta: { title: '教改论文', icon: 'paper', roles: ['cadmin'] },
    children: [
      {
        path: 'index',
        name: 'reform_paper',
        component: () => import('@/views/cadmin/reform_paper'),
        meta: { title: '教改论文', icon: 'paper' }
      }
    ]
  },

  {
    path: '/innovation',
    component: Layout,
    redirect: '/innovation/index',
    name: 'innovation',
    meta: { title: '大创项目', icon: 'innovation', roles: ['cadmin'] },
    children: [
      {
        path: 'index',
        name: 'innovation',
        component: () => import('@/views/cadmin/innovation'),
        meta: { title: '大创项目', icon: 'innovation' }
      }
    ]
  },

  {
    path: '/invigilate',
    component: Layout,
    redirect: '/invigilate/verify',
    name: 'rank',
    meta: { title: '监考信息管理', icon: 'invigilate', roles: ['cadmin'] },
    children: [
      {
        path: 'verify',
        name: 'verify',
        component: () => import('@/views/cadmin/invigilate/verify'),
        meta: { title: '信息审核', icon: 'form' }
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/views/cadmin/invigilate/statistics'),
        meta: { title: '信息统计', icon: 'form' }
      }
    ]
  },

  // 普通教师路由配置---------------------------------------------------------------------
  {
    path: '/teach_reform',
    component: Layout,
    redirect: '/teach_reform/index',
    name: 'teach_reform',
    meta: { title: '教改项目', icon: 'project', roles: ['normal'] },
    children: [
      {
        path: 'index',
        name: 'teach_reform_index',
        component: () => import('@/views/normal/teach_reform'),
        meta: { title: '教改项目', icon: 'project' }
      }
    ]
  },

  {
    path: '/book',
    component: Layout,
    redirect: '/book/list',
    name: 'book',
    meta: { title: '教材管理', icon: 'book', roles: ['normal'] },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/normal/book/list'),
        meta: { title: '教材信息', icon: 'booklist' }
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/normal/book/create'),
        meta: { title: '增加教材', icon: 'add' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
