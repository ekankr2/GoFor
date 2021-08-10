<template>
  <v-app>
    <nav-bar-component></nav-bar-component>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavBarComponent from "./views/NavBarComponent";
export default {
  name: 'App',
  components: {NavBarComponent},
  data: () => ({
    //
  }),
};
</script>
