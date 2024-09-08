import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        // 判斷當前使用者是否已經拉取完 user_info 訊息
        store.dispatch('GetInfo').then(() => {
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            // 根據roles權限生成可訪問的路由表
            router.addRoutes(accessRoutes) // 動態添加可訪問的路由表
            next({ ...to, replace: true }) // hack方法 確保addRoutes已經完成
          })
        }).catch(err => {
          store.dispatch('LogOut').then(() => {
            Message.error({
              message: err
            })
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // no token
    if (whiteList.indexOf(to.path) !== -1) {
      // No need login white list, enter directly
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // or, redirect to login page overall
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
