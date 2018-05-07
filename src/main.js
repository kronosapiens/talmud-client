import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

import App from './App.vue'
import Page404 from './components/Page404.vue'
import PageAbout from './components/PageAbout.vue'
import PageExplore from './components/PageExplore.vue'
import PagePlay from './components/PagePlay.vue'
import PageUser from './components/PageUser.vue'
import PageSplash from './components/PageSplash.vue'

const routes = [
  { path: '/', component: PageSplash },
  { path: '/play', component: PagePlay },
  { path: '/explore', component: PageExplore },
  { path: '/about', component: PageAbout },
  { path: '/login', component: PageUser },
  { path: '*', component: Page404 }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

const app = new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
