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
        <member-login-card @submit="onLogin" v-if="!session"></member-login-card>
        <!-- sign up button -->
        <member-register-card v-if="!session"></member-register-card>
        <!-- if login true
        <v-btn class="btn-flat" v-if="isLogin" @click="logout">
          {{session.member_id}}
        </v-btn>
        -->
        <member-menu :session="session" v-if="session" @logout="removeSession"></member-menu>
      </v-toolbar-items>

      <!-- nav icon -->

      <NavDrawerComponent></NavDrawerComponent>
    </v-app-bar >

    <!-- drawer -->


  </div>
</template>

<script>
import MemberLoginCard from "../components/HomeContents/MemberLoginCard";
import MemberRegisterCard from "../components/HomeContents/MemberRegisterCard";
import Vue from "vue";
import axios from "axios";
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
      nav_drawer: false,
      show: false,
    }
  },
  computed: {
    ...mapState(["session"])
  },

  methods: {
    ...mapActions(['removeSession']),
    onLogin (payload) {
      if(this.$store.state.session == null) {
        const {member_id, member_pw} = payload
        const name = null
        axios.post('https://goforbackend.herokuapp.com/member/login', {member_id, member_pw, name})
            .then(res => {
              if (res.data != "") {
                alert(res.data.member_id + "님 환영합니다.")
                window.location.reload();
                this.isLogin = true;
                this.$store.state.session = res.data
                this.$cookies.set("user", res.data, '1h')
              } else {
                alert('아이디와 비밀번호를 확인해주세요. ' + res.data)
              }
            })
            .catch(res => {
              console.log(res)
              alert('아이디와 비밀번호를 확인해주세요. ')
            })
      } else {
        alert("이미 로그인 되어 있습니다. 아이디 : " +this.$store.state.session.userId)
      }
    },
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
