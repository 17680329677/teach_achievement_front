import Layout from '@/views/layout/Layout'  //引入根目录下views中的Layout.vue组件

/*
super admin router
校级管理员路由
 */
const sadminRouter = [

  // 校级管理员路由配置------------------------------------------------------------------

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '首页', icon: 'dashboard', roles: ['sadmin'] },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/sadmin_college/dashboard'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

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
    meta: { title: '账号分配', icon: 'example', roles: ['sadmin'] },
    children: [
      {
        path: 'index',
        name: 'manage',
        component: () => import('@/views/sadmin_college/academicSecretary'),
        meta: { title: '学院账号分配', icon: 'peoples' }
      }
    ]
  },

  {
    path: '/rankteacherCategory',
    component: Layout,
    redirect: '/rank/teacherCategory',
    name: 'rankteacherCategory',
    meta: { title: '教师类型', icon: 'example', roles: ['sadmin'] },
    children: [
      {
        path: 'index',
        name: 'teacherCategory',
        component: () => import('@/views/sadmin_college/rank/teacherCategory'),
        meta: { title: '教师类型配置', icon: 'peoples' }
      }
    ]
  },

  {
    path: '/rankTitlerank',
    component: Layout,
    redirect: '/rank/titlerank',
    name: 'rankTitlerank',
    meta: { title: '教师职称', icon: 'nested', roles: ['sadmin'] },
    children: [
      {
        path: 'titlerank',
        name: 'title',
        component: () => import('@/views/sadmin_college/rank/titleRank'),
        meta: { title: '教师职称配置', icon: 'peoples' }
      },
    ]
  },

  {
    path: '/rankCertificate',
    component: Layout,
    redirect: '/rank/certificate',
    name: 'rankCertificate',
    meta: {title: '证书等级', icon: 'nested', roles: ['sadmin']},
    children: [
      {
        path: 'certificate',
        name: 'certificate',
        component: () => import('@/views/sadmin_college/rank/certificate'),
        meta: { title: '证书等级配置', icon: 'paper' }
      }
    ]
  },
  {
    path: '/rankBookclass',
    component: Layout,
    redirect: '/rank/bookclass',
    name: 'rankBookclass',
    meta: {title: '教材等级', icon: 'nested', roles: ['sadmin']},
    children: [
      {
        path: 'bookclass',
        name: 'book',
        component: () => import('@/views/sadmin_college/rank/bookClass'),
        meta: { title: '教材等级配置', icon: 'book' }
      },
    ]
  },
  {
    path: '/rankReformType',
    component: Layout,
    redirect: '/rank/reformType',
    name: 'rankReformType',
    meta: {title: '教改项目类型', icon: 'nested', roles: ['sadmin']},
    children: [
      //教改项目类型配置
      {
        path: 'reformType',
        name: 'type',
        component: () => import('@/views/sadmin_college/rank/teachReform/type'),
        meta: { title: '教改项目类型配置', icon: 'project'  }
      },
    ]
  },
  {
    path: '/rankReformChildType',
    component: Layout,
    redirect: '/rank/reformChildType',
    name: 'rankReformChildType',
    meta: {title: '教改项目子类型', icon: 'nested', roles: ['sadmin']},
    children: [
      {
        path: 'reformChildType',
        name: 'childType',
        component: () => import('@/views/sadmin_college/rank/teachReform/childType'),
        meta: { title: '教改项目子类型配置', icon: 'project' }
      },
    ]
  },
  {
    path: '/rankReformRank',
    component: Layout,
    redirect: '/rank/reformRank',
    name: 'rankReformRank',
    meta: {title: '教改项目等级', icon: 'nested', roles: ['sadmin']},
    children: [
      {
        path: 'reformRank',
        name: 'reformRank',
        component: () => import('@/views/sadmin_college/rank/teachReform/reformRank'),
        meta: { title: '教改项目等级配置' , icon: 'project'}
      },
    ]
  },
  //教改项目类型配置  end
  {
    path: '/rankInnovation',
    component: Layout,
    redirect: '/rank/innovation',
    name: 'rankInnovation',
    meta: {title: '大创等级', icon: 'nested', roles: ['sadmin']},
    children: [

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

]


export default sadminRouter
