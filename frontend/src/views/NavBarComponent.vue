<template>
  <div class="nav-container" >
    <v-app-bar app dense dark>

      <v-toolbar-title>
        <router-link to="/" class="white--text">
          <span class="font-weight-bold text-h4 hidden-sm-and-down">GoFor</span>
        </router-link>
      </v-toolbar-title>

      <!--hidden Mobile Home -->
      <router-link to="/" class="white--text font-weight-bold text-h3 ma-auto hidden-md-and-up">
        <span>GoFor</span>
      </router-link>

      <v-toolbar-items class="ml-auto hidden-sm-and-down">

        <!-- login button  -->
        <member-login-card v-if="!session"></member-login-card>
        <!-- sign up button -->
        <member-register-card v-if="!session"></member-register-card>

        <member-menu v-if="session" @logout="removeSession"></member-menu>
      </v-toolbar-items>

      <!-- drawer -->
      <NavDrawerComponent></NavDrawerComponent>
    </v-app-bar >




  </div>
</template>

<script>
import MemberLoginCard from "../components/HomeContents/MemberLoginCard";
import MemberRegisterCard from "../components/HomeContents/MemberRegisterCard";
import Vue from "vue";
import {mapActions, mapState} from 'vuex'

import cookies from "vue-cookies";
import MemberMenu from "../components/HomeContents/MemberMenu";
import NavDrawerComponent from "./NavDrawerComponent";
Vue.use(cookies)
export default {
  name: 'NavBarComponent',
  components: {NavDrawerComponent, MemberMenu, MemberRegisterCard, MemberLoginCard},
  data () {
    return {
    }
  },
  computed: {
    ...mapState(["session"])
  },

  methods: {
    ...mapActions(['removeSession']),
  },
}
</script>

<style scoped>

span{
  user-select: none;
}
.logout{
  cursor: pointer;
}
</style>
