<template>
  <div>
    <v-app-bar-nav-icon app @click="nav_drawer = !nav_drawer" class="hidden-md-and-up ml-auto">
    </v-app-bar-nav-icon>

    <v-navigation-drawer app v-model="nav_drawer" absolute temporary right>

      <v-list-item>
        <v-list-item-avatar v-if="session">
          <v-img src="https://user-images.githubusercontent.com/83811729/139426389-ea6ace2a-bd42-4e3a-96fa-82388a029e67.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content v-if="session" @click="$router.push('/isMyPage')" class="pointer">
          <v-list-item-title>{{ session.memberId }}</v-list-item-title>
        </v-list-item-content>

        <div class="loginBtn" v-if="!session">
          <v-icon>exit_to_app</v-icon>
          <member-login-card/>
        </div>
        <v-divider class="divider"></v-divider>
        <div class="registerBtn">
          <v-icon>exit_to_app</v-icon>
          <member-register-card/>
        </div>

      </v-list-item>



    </v-navigation-drawer>

  </div>

</template>

<script>
import MemberRegisterCard from "../components/HomeContents/MemberRegisterCard";
import MemberLoginCard from "../components/HomeContents/MemberLoginCard";
import {mapActions, mapState} from "vuex";

export default {
  name: "NavDrawerComponent",
  components: {MemberRegisterCard, MemberLoginCard},
  computed: {
    ...mapState(['session'])
  },
  data() {
    return {
      nav_drawer: false,
    }
  },
  methods: {
    ...mapActions(['removeSession'])
  }
}
</script>

<style scoped>
.loginBtn{
  position: absolute;
  top: 20px;
}
.registerBtn{
  position: absolute;
  top: 80px;
}
.divider{
  margin-top: 82px;
}
</style>
