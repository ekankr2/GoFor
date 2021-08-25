<template>
  <v-dialog elevation="15" v-model="seeLocation" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="black" class="btn-flat px-16 text-h6 font-weight-regular" v-on="on" v-bind="attrs">
        <v-icon class="mr-6 ml-n3">location_on</v-icon>Location</v-btn>
    </template>
    <v-card elevation="15">

      <!-- card title -->
      <v-card-title class="headline text-h4">
        Current Location
      </v-card-title>
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

export default {
  name: "MapLocation",
  components: {
    MglMap,
    MglMarker
  },
  data() {
    return {
      seeLocation: false,
      accessToken:
          "pk.eyJ1IjoibWlrZWhhbWlsdG9uMDAiLCJhIjoiNDVjS2puUSJ9.aLvWM5BnllUGJ0e6nwMSEg", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style
      coordinates: [127.01378671832322,37.571116946077936],
      center: [127.01378671832322,37.571116946077936],
      zoom: 5,
    };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
};

</script>

<style scoped>
div.map{
  width: 600px;
  height: 600px;
}
</style>
