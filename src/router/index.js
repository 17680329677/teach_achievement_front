import Vue from 'vue'    //引入Vue
import Router from 'vue-router'   //引入vue-router

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'  //引入根目录下views中的Layout.vue组件

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

export const asyncRouterMap = [   //配置路由，这里是个数组
  // 校级管理员路由配置------------------------------------------------------------------
  {                               //每一个链接都是一个对象
    path: '/college',             //链接路径
    component: Layout,            //对应的组件模板
    redirect: '/college/index',
    name: 'collegeinfo',          //路由名称，
    meta: { title: '学院', icon: 'example', roles: ['sadmin'] },
    children: [                   //子路由,嵌套路由 （此处偷个懒，免得单独再列一点）
      {
        path: 'index',
        name: 'college',
        component: () => import('@/views/sadmin_college/collegeInfo'), //对应组件
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
    redirect: '/rank/titlerank',
    name: 'rank',
    meta: { title: '信息配置', icon: 'nested', roles: ['sadmin'] },
    children: [
      {
        path: 'titlerank',
        name: 'title',
        component: () => import('@/views/sadmin_college/rank/titleRank'),
        meta: { title: '教师职称配置', icon: 'peoples' }
      },
      {
        path: 'certificate',
        name: 'certificate',
        component: () => import('@/views/sadmin_college/rank/certificate'),
        meta: { title: '证书等级配置', icon: 'paper' }
      },
      {
        path: 'bookclass',
        name: 'book',
        component: () => import('@/views/sadmin_college/rank/bookClass'),
        meta: { title: '教材等级配置', icon: 'book' }
      },
              //教改项目类型配置
      {
        path: 'reformType',
        name: 'type',
        component: () => import('@/views/sadmin_college/rank/teachReform/type'),
        meta: { title: '教改项目类型配置', icon: 'project'  }
      },
      {
        path: 'reformChildType',
        name: 'childType',
        component: () => import('@/views/sadmin_college/rank/teachReform/childType'),
        meta: { title: '教改项目子类型配置', icon: 'project' }
      },
      {
        path: 'reformRank',
        name: 'reformRank',
        component: () => import('@/views/sadmin_college/rank/teachReform/reformRank'),
        meta: { title: '教改项目等级配置' , icon: 'project'}
      },
                //教改项目类型配置  end
      {
        path: 'innovation',
        name: 'innovation',
        component: () => import('@/views/sadmin_college/rank/innovation'),
        meta: { title: '大创等级配置', icon: 'innovation' }
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
        meta: { title: '学期配置', icon: 'table' }
      }
    ]
  },

  {       //wkz新增
    path: '/password',
    component: Layout,
    redirect: '/password/index',
    name: 'password',
    meta: { title: '密码管理', icon: 'example', roles: ['sadmin'] },
    children: [
      {
        path: 'index',
        name: 'passwordChange',
        component: () => import('@/views/sadmin_college/passwordChange'),
        meta: { title: '修改密码', icon: 'password' }
      }
    ]
  },

  // 院级教务秘书路由配置(院级管理员)----------------------------------------------------------------------
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
    redirect: '/teacher/info',
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
    name: 'tea_reform',
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
    name: 'reform_papers',
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
    name: 'innovations',
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
    name: 'invigilate',
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

  { //大类分流
    path: '/distribution',
    component: Layout,
    redirect: '/distribution/class_info',
    name: 'distribution',
    meta: { title: '大类分流', icon: 'table', roles: ['cadmin'] },
    children: [
      {
        path: 'class_info',
        name: 'class_info',
        component: () => import('@/views/cadmin/distribution/class_info'),
        meta: { title: '班级信息', icon: 'form' }
      },
      {
        path: 'info_import',
        name: 'info_import',
        component: () => import('@/views/cadmin/distribution/info_import'),
        meta: { title: '学生信息导入', icon: 'form' }
      },
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/cadmin/distribution/config'),
        meta: { title: '分流配置', icon: 'form' }
      },
      {
        path: 'desire',
        name: 'desire',
        component: () => import('@/views/cadmin/distribution/desire'),
        meta: { title: '志愿填报情况', icon: 'form' }
      },
      {
        path: 'result',
        name: 'result',
        component: () => import('@/views/cadmin/distribution/result'),
        meta: { title: '分流结果', icon: 'form' }
      }

    ]
  },

  // 普通教师路由配置---------------------------------------------------------------------
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
    ]
  },

  {
    path: '/teach_reform',
    component: Layout,
    redirect: '/teach_reform/index',
    name: 'teach_reforms',
    meta: { title: '教改项目', icon: 'project', roles: ['normal'] },
    children: [
      {
        path: 'index',
        name: 'teach_reform',
        component: () => import('@/views/normal/teach_reform'),
        meta: { title: '教改项目', icon: 'project' }
      },
    ]
  },

          //teacher 新增

  {
    path: '/reform_paper',
    component: Layout,
    redirect: '/reform_paper/index',
    name: 'reform_papers',
    meta: { title: '教改论文', icon: 'paper', roles: ['normal'] },
    children: [
      {
        path: 'index',
        name: 'reform_paper',
        component: () => import('@/views/normal/reform_paper'),
        meta: { title: '教改论文', icon: 'paper' }
      }
    ]
  },

  {
    path: '/innovation',
    component: Layout,
    redirect: '/innovation/index',
    name: 'innovations',
    meta: { title: '大创项目', icon: 'innovation', roles: ['normal'] },
    children: [
      {
        path: 'index',
        name: 'innovation',
        component: () => import('@/views/normal/innovation'),
        meta: { title: '大创项目', icon: 'innovation' }
      }
    ]
  },


          //teacher 新增 end

  { //监考信息
    path: '/invigilate',
    component: Layout,
    redirect: '/invigilate/index',
    name: 'invigilate',
    meta: { title: '监考信息', icon: 'book', roles: ['normal'] },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/normal/invigilate'),
        meta: { title: '监考信息', icon: 'booklist' }
      },
    ]
  },

  // 学生用户路由配置---------------------------------------------------------------------
  { //password
    path: '/student_info',
    component: Layout,
    redirect: '/student_info/password',
    name: 'student_info',
    meta: { title: '个人信息', icon: 'invigilate', roles: ['student'] },
    children: [
      {
        path: 'password',
        name: 'password',
        component: () => import('@/views/student/password'),
        meta: { title: '修改密码', icon: 'invigilate' }
      },
    ]
  },

  { //大类分流
    path: '/student_distribution',
    component: Layout,
    redirect: '/student_distribution/reform',
    name: 'student_distribution_reform',
    meta: { title: '大类分流', icon: 'department', roles: ['student'] },
    children: [
      {
        path: 'reform',
        name: 'reform',
        component: () => import('@/views/student/distribution_reform'),
        meta: { title: '志愿填报', icon: 'department' }
      },
    ]
  },

  { //分流结果
    path: '/student_distribution_res',
    component: Layout,
    redirect: '/student_distribution_res/result',
    name: 'student_distribution_result',
    meta: { title: '大类分流', icon: 'list', roles: ['student'] },
    children: [
      {
        path: 'result',
        name: 'result',
        component: () => import('@/views/student/distribution_result'),
        meta: { title: '分流结果', icon: 'list' }
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
