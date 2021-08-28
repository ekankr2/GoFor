<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="mx-auto" max-width="400">
        <v-card-title class="white--text text-h5 text font-weight-medium orange darken-4">
          Select City

          <v-spacer></v-spacer>

          <v-btn color="white" class="text--primary" @click="show = !show" fab small>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card elevation="10" max-width="300" min-width="300" class="mx-auto">
          <v-simple-table height="300px" v-if="show">
            <template v-slot:default>
              <tbody>
              <tr v-for="item in data" :key="item.city">
                <td class="text-h6 font-weight-regular">{{item.city}}, {{item.country}}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>

      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "TestPage",
  data() {
    return {
      show: false,
      data: this.$store.getters.walkVid,
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
