import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FireBaseRegisterInView from '../views/FireBaseRegisterView.vue'
import AddBookView  from '../views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import {ref} from 'vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'
import process from 'node:process'

const isAuthenticated = ref(null)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/firebase-register',
    name: 'FireBaseRegister',
    component: FireBaseRegisterInView 
  },
  {
    path:"/add-book",
    name:"AddBook",
    component: AddBookView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path:"/getBookCount",
    name:"GetBookCount",
    component: GetBookCountView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path:"/CurrentWeather",
    name:"CurrentWeather",
    component: WeatherView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path:"/CountBookAPI",
    name:"CountBookAPI",
    component: CountBookAPI,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path:"/GetAllBookAPI",
    name:"GetAllBookAPI",
    component: GetAllBookAPI,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
export { isAuthenticated }