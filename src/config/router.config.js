
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/demo01',
    children: [
      {
        path: '/demo01',
        name: 'demo-01',
        component: () => import('@/views/demo/demo01/index'),
        meta: { title: '页面1', keepAlive: true }
      },
      {
        path: '/demo02',
        name: 'demo-02',
        component: () => import('@/views/demo/demo02/index'),
        meta: { title: '页面2', keepAlive: true }
      },
      {
        path: '/demo03',
        name: 'demo-03',
        component: () => import('@/views/demo/demo03/index'),
        meta: { title: '页面3', keepAlive: true }
      },
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
	
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
