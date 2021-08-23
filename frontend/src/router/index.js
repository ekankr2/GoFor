import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import MemberRegisterPage from "../views/MemberRegisterPage";
import MemberLoginPage from "../views/MemberLoginPage";


import Car from "../views/Car";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/memberRegister',
    name: 'MemberRegisterPage',
    components: {
      default: MemberRegisterPage
    }
  },
  {
    path: '/memberLogin',
    name: 'MemberLoginPage',
    components: {
      default: MemberLoginPage
    }
  },
  {
    path: '/car',
    name: 'Car',
    components: {
      default: Car
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
