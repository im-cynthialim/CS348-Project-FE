import { createMemoryHistory, createRouter } from 'vue-router'

import Login from './components/Login.vue'
import MainView from './components/MainView.vue'

const routes = [
  { path: '/', component: Login},
  { path: '/home', component: MainView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
