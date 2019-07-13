import Layout from '@/views/layout/Layout'  //引入根目录下views中的Layout.vue组件

/*
college admin router
院级管理员路由
 */
const cadminRouter = [

  // 院级管理员由配置----------------------------------------------------------------------
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '首页', icon: 'dashboard', roles: ['cadmin'] },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/cadmin/dashboard'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

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


]


export default cadminRouter
