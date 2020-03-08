import Vue from 'vue'
import Router from 'vue-router'
import CrmLayout from '../layout/crm/index.vue'

Vue.use(Router)

// Note: router 3.1.0 after hack, No stack trace in the error object 
// Detail see: https://github.com/vuejs/vue-router/issues/2881
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

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
    role: ['admin','editor']    control the page role (you can set multiple role)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */


/**
 * 固定路由
 * 常用的路由，不用什么权限判断
 */
export const constrantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: { title: 'Login' },
    hidden: true
  },
  {
    path: '/',
    redirect: '/shop/index',
  },
  {
    path: '/shop',
    redirect: '/shop/index',
    component: CrmLayout,
    children: [{
      path: 'index',
      name: 'Shop',
      meta: { title: 'Shop' },
      component: () => import('@/views/shop/index.vue'),
      hidden: true
    }, {
      path: 'editGoods',
      name: 'editGoods',
      meta: { title: 'EditGoods' },
      component: () => import('@/views/shop/EditGoods.vue'),
      hidden: true
    }],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/redirect/404'),
    hidden: true
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/redirect/401'),
    hidden: true
  }
]

/**
 * 权限路由
 * 根据用户的权限角色来显示路由
 */
export const asyncRoutes = [
]

const createRouter = () => {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constrantRoutes
  })

  return router
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
