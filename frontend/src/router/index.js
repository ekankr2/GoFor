import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

import Car from "../views/Car";
import Walk from "../views/Walk";
import Bike from "../views/Bike";
import Motorcycle from "../views/Motorcycle";
import TestPage from "../views/TestPage";
import BoardRegisterPage from "../views/BoardRegisterPage";
import BoardListPage from "../views/BoardListPage";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/test',
    name: 'TestPage',
    components: {
      default: TestPage
    }
  },
  {
    path: '/board/create',
    name: 'BoardRegisterPage',
    components: {
      default: BoardRegisterPage
    }
  },
  {
    path: '/board',
    name: 'BoardListPage',
    components: {
      default: BoardListPage
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
