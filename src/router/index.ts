import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import routes from './routes'
import { authService } from '../boot/auth'
import { usersStore } from '../store/LoggedUser'
import { AuthUser } from '../interfaces/AuthUser'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  router.beforeEach((to, _from, next) => {
    if (to.path === '/login') {
      authService.handleLoginRedirect()
        .then(() => {
          next('/')
        })
        .catch(error => {
          console.log(error)
          next('/')
        })
    } else if (to.path === '/logout') {
      authService.handleLogoutRedirect()
        .then(() => {
          next('/')
        })
        .catch(error => {
          console.log(error)
          next('/:catchAll(.*)*')
        })
    } else {
      const store = usersStore()
      authService.getProfile().then(async (response) => {
        // console.log('res from router is', response)
        localStorage.setItem('user', response as string)
        store.$state.user = response as AuthUser
        await authService.getAccessToken()
          .then(token => {
            localStorage.setItem('token', token as string)
          })
      })
        .catch(err => console.log('err', err))
      next()
    }
  })

  return router
})
