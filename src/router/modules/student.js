import Layout from '@/views/layout/Layout'  //引入根目录下views中的Layout.vue组件

/*
student router
学生路由
 */
const studentRouter = [


  // 学生用户路由配置---------------------------------------------------------------------
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '首页', icon: 'dashboard', roles: ['student'] },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/student/dashboard'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

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

]


export default studentRouter
