// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)

// /* Layout */
// import Layout from '@/layout'

// /**
//  * Note: sub-menu only appear when route children.length >= 1
//  * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
//  *
//  * hidden: true                   if set true, item will not show in the sidebar(default is false)
//  * alwaysShow: true               if set true, will always show the root menu
//  *                                if not set alwaysShow, when item has more than one children route,
//  *                                it will becomes nested mode, otherwise not show the root menu
//  * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
//  * name:'router-name'             the name is used by <keep-alive> (must set!!!)
//  * meta : {
//     roles: ['admin','editor']    control the page roles (you can set multiple roles)
//     title: 'title'               the name show in sidebar and breadcrumb (recommend set)
//     icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
//     breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
//     activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
//   }
//  */

// /**
//  * constantRoutes
//  * a base page that does not have permission requirements
//  * all roles can be accessed
//  */
// export const constantRoutes = [
//   {
//     path: '/login',
//     component: () => import('@/views/login/index'),
//     hidden: true
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard',
//     children: [{
//       path: 'dashboard',
//       name: 'Dashboard',
//       component: () => import('@/views/dashboard/index'),
//       meta: { title: '首页', icon: 'dashboard' }
//     }]
//   }
//   // {
//   //   path: '/write',
//   //   component: () => import('@/views/content/article/write/index'),
//   //   hidden: true
//   // }
// ]

// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes
// })

// const router = createRouter()

// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

// export default router

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首頁', icon: 'dashboard' }
    }],
  },
  {
    path: '/write',
    component: Layout,
    children: [{
      path: '/',
      name: 'Write',
      component: () => import('@/views/content/article/write/index'),
      //hidden: true
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    meta: { title: '系統管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user'),
        meta: { title: '用戶管理', icon: 'el-icon-user' },
        //hidden: true
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: { title: '角色管理', icon: 'el-icon-s-custom' },
        //hidden: true
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu'),
        meta: { title: '菜單管理', icon: 'el-icon-menu' },
        //hidden: true
      }
    ],
    //hidden: true
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content',
    meta: { title: '內容管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/content/article/index'),
        meta: { title: '文章管理', icon: 'el-icon-notebook-1' },
        //hidden: true
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/content/category/index'),
        meta: { title: '分類管理', icon: 'el-icon-collection-tag' },
        //hidden: true
      },
      {
        path: 'link',
        name: 'Link',
        component: () => import('@/views/content/link/index'),
        meta: { title: '友情連接管理', icon: 'el-icon-link' },
        //hidden: true
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('@/views/content/tag/index'),
        meta: { title: '標籤管理', icon: 'el-icon-price-tag' },
        //hidden: true
      }
    ],
    //hidden: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router

