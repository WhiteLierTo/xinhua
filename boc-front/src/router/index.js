import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [{
  path: '/',
  component: () =>
    import('../views/index'),
  name: 'login'

}]

export default new Router({
  mode: 'history',
  routes: constantRoutes
})