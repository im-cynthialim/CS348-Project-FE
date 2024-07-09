import { createMemoryHistory, createRouter } from 'vue-router'

import Login from './components/Login.vue'
import HomeView from './components/HomeView.vue'
import ProfileView from './components/ProfileView.vue'
import BookingView from './components/BookingView.vue'

const routes = [
  { path: '/', component: Login},
  {path: '/home', component: HomeView},
  { path: '/profile', component: ProfileView },
  { path: '/booking', component: BookingView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
