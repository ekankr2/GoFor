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
        <member-register-card></member-register-card>

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
        <!-- menus -->
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="link in links" :key="link.name" router :to="link.route">
            <v-list-item-action>
              <v-icon left>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import MemberLoginCard from "../components/MemberLoginCard";
import MemberRegisterCard from "../components/MemberRegisterCard";
export default {
  name: 'NavBarComponent',
  components: {MemberRegisterCard, MemberLoginCard},
  data () {
    return {
      group: false,
      nav_drawer: false,
      links: [
        {
          icon: 'home', text: 'Home', name: 'home', route: '/'
        },
        {
          icon: 'account_box', text: '로그인', name: 'credit_card', route: '/product'
        },
        {
          icon: 'person_add', text: '회원가입', name: 'ev_station', route: '/materialize'
        }
      ],
    }
  },
  methods: {

  },
  watch: {
    group () {
      this.nav_drawer = false
    }
  }
}
</script>

<style scoped>

span{
  user-select: none;
}
</style>