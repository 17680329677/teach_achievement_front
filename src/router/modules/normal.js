import Layout from '@/views/layout/Layout'  //引入根目录下views中的Layout.vue组件

/*
normal teacher router
普通教师路由
 */
const normalRouter = [

  // 普通教师路由配置---------------------------------------------------------------------
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '首页', icon: 'dashboard', roles: ['normal'] },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/normal/dashboard'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
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


]


export default normalRouter
