import router from './router'
import store from './store'
import { Message } from 'element-ui'
import nprogress from './plugins/nprogress'
import { getToken } from './helper/auth'
import { title } from './config'

const whiteList = ['/login']  // no redirect whitelist

router.beforeEach(async (to, form, next) => {
  // start progress bar
  nprogress.start();

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否登录过
  const hasToken = getToken()

  // 如果没有token，只能访问白名单中的页面，不然跳转到登录页面
  if (!hasToken) {
    return whiteList.indexOf(to.path) !== -1 ? next() : next(`login?redirect=${to.path}`)
  }

  // 有 token 自动登录首页
  if (to.path === '/login') {
    return next({ path: '/' })
  }

  // 确认用户角色
  const hasRole = store.getters.role && (store.getters.role !== -1)

  if (hasRole) {
    return next()
  }


  try {
    // 获取用户信息
    const { role } = await store.dispatch('user/getInfo')

    // 基于角色生成可访问的路由
    const accessRoutes = await store.dispatch('permission/generateRoutes', role)

    // 动态添加可访问路由
    router.addRoutes(accessRoutes)

    // 确保 addRoutes 完整的 hack 方法
    // 设置 replace:true, 保证导航不留下历史记录
    next({ ...to, replace: true })
  } catch (error) {
    // 删除 token 并 跳转到 login 页面 重新登录
    // 1. token 过期
    // 2. 非法 token
    await store.dispatch('user/resetToken')
    Message.error(error || 'System Error')
    next(`/login?redirect=${to.path}`)
    nprogress.done()
  }
});

router.afterEach(() => {
  // done proogress bar
  nprogress.done();
});


function getPageTitle(pageTitle = '') {
  return pageTitle ? `${pageTitle} - ${title}` : title
}