import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MemberRegisterPage from "../views/MemberRegisterPage";

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
