<template>
  <v-dialog elevation="15" v-model="seeLocation" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined color="indigo" class="btn-flat mt-n2 text-h6 font-weight-regular" v-on="on" v-bind="attrs">
        <v-icon class="mr-8 ml-n4">location_on</v-icon>Location</v-btn>
    </template>
    <v-card elevation="15">

      <!-- card title -->
      <v-card-title class="text-h4 mb-1">Current Location</v-card-title>
      <v-card-subtitle class="text-h6 mb-n3 ml-1"><v-icon>place</v-icon>
        {{ getRandomWalk.city }}, {{ getRandomWalk.country }}</v-card-subtitle>

      <!-- card contents -->
      <div class="map">
        <MglMap :accessToken="accessToken" :mapStyle="mapStyle"
                :center="center" :zoom="zoom">
          <MglMarker :coordinates="coordinates"/>
        </MglMap>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap,  MglMarker } from "vue-mapbox";
import { mapGetters } from "vuex"

export default {
  name: "MapLocation",
  components: {
    MglMap,
    MglMarker
  },
  computed: {
    ...mapGetters(['getRandomWalk'])
  },
  data() {
    return {
      seeLocation: false,
      accessToken:
          "pk.eyJ1IjoibWlrZWhhbWlsdG9uMDAiLCJhIjoiNDVjS2puUSJ9.aLvWM5BnllUGJ0e6nwMSEg", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style
      coordinates: '',
      center: '',
      zoom: 5,
    };
  },
  beforeUpdate() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
    this.getCoordinates()
  },
  methods: {
    getCoordinates() {
      const vid = this.getRandomWalk
      const coordinates = vid.zoom
      const array = coordinates.split(",").map(Number)
      this.coordinates = array
      this.center = array
    }
  }
};

</script>

<style scoped>
div.map{
  width: 100%;
  height: 600px;
}
</style>
