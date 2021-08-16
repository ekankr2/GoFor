<template>
  <div>
    <v-toolbar dense dark>
      <v-toolbar-title>
        <router-link to="/" class="white--text">
          <span class="font-weight-bold text-h4 hidden-sm-and-down">GoFor</span>
        </router-link>
      </v-toolbar-title>
      <!--hidden Mobile Home -->
      <router-link to="/" class="white--text font-weight-bold text-h3 ml-auto mr-n8 hidden-md-and-up">
        <span>GoFor</span>
      </router-link>
      <v-toolbar-items class="ml-auto hidden-sm-and-down">

        <!-- login button  -->
        <member-login-card></member-login-card>
        <!-- sign up button -->
        <member-register-card @submit="onRegister" >
        </member-register-card>

      </v-toolbar-items>

      <!-- nav icon -->
      <v-app-bar-nav-icon @click="nav_drawer = !nav_drawer" class="hidden-md-and-up ml-auto">
      </v-app-bar-nav-icon>
    </v-toolbar >

    <!-- drawer -->
    <v-navigation-drawer app v-model="nav_drawer" temporary right>
      <v-list nav dense>
        <!-- X icon -->
        <v-subheader>
          <v-icon right @click="nav_drawer = !nav_drawer" style="cursor: pointer"
                  class="ml-auto pb-2">close</v-icon>
        </v-subheader>
        <!--contents -->
        <navigation-drawer-content></navigation-drawer-content>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>
import MemberLoginCard from "../components/MemberLoginCard";
import MemberRegisterCard from "../components/MemberRegisterCard";
import NavigationDrawerContent from "../components/NavigationDrawerContent";
import axios from "axios";
export default {
  name: 'NavBarComponent',
  components: {NavigationDrawerContent, MemberRegisterCard, MemberLoginCard},
  data () {
    return {
      nav_drawer: false,
    }
  },
  methods: {
    onRegister (payload) {
      const { member_id, member_pw, name, email } = payload
      axios.post(`http://localhost:7777/member/register`, { member_id, member_pw, name, email })
          .then(res =>{
             alert('가입이 완료되었습니다!' + res)
            this.member_id = ''
            this.member_pw = ''
            this.name = ''
            this.email = ''
          })
          .catch(res => {
            alert(res.response.data.message)
          })
    },
  },
}
</script>

<style scoped>
span{
  user-select: none;
}
</style>