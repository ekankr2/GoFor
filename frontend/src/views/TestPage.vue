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

        <v-card elevation="10" max-width="250" min-width="250" class="mx-auto">
          <v-simple-table height="300px" v-if="show">
            <template v-slot:default>
              <tbody>
              <tr v-for="(item,idx) in data" :key="idx">
                <td class="text-h6 font-weight-regular"
                    @click="updateSelected(item.video_id[Math.floor(Math.random() * item.video_id.length)])">
                  {{item.city}}, {{item.country}}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        <div v-if="showPlaces">{{ selectedPlace }}</div>
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
      showPlaces: false,
      data: this.$store.getters.walkVid,
      selectedPlace: {},
    }
  },
  methods: {
    updateSelected(selectedItem) {
      this.selectedPlace = selectedItem
      this.showPlaces = true
    }
  }
}
</script>

<style scoped>

</style>
