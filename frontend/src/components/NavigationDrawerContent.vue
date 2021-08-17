<template>
  <!-- menus -->
  <v-list-item-group active-class="deep-purple--text text--accent-4">
    <v-list-item v-for="link in links" :key="link.name" router :to="link.route">
      <v-list-item-action>
        <v-icon left>{{ link.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ link.text }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
export default {
  name: "NavigationDrawerContent",
  data() {
    return {
      links: [
        {
          icon: 'home', text: 'Home', name: 'home', route: '/'
        },
        {
          icon: 'account_box', text: '로그인', name: 'login', route: '/memberLogin'
        },
        {
          icon: 'person_add', text: '회원가입', name: 'sign-up', route: '/memberRegister'
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>