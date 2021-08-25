import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import MemberRegisterPage from "../views/MemberRegisterPage";
import MemberLoginPage from "../views/MemberLoginPage";


import Car from "../views/Car";
import Walk from "../views/Walk";
import Bike from "../views/Bike";
import Motorcycle from "../views/Motorcycle";
import MapTest from "../views/MapTest";


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
    path: '/walk',
    name: 'Walk',
    components: {
      default: Walk
    }
  },
  {
    path: '/bike',
    name: 'Bike',
    components: {
      default: Bike
    }
  },
  {
    path: '/motorcycle',
    name: 'Motorcycle',
    components: {
      default: Motorcycle
    }
  },
  {
    path: '/car',
    name: 'Car',
    components: {
      default: Car
    }
  },
  {
    path: '/map',
    name: 'MapTest',
    components: {
      default: MapTest
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
