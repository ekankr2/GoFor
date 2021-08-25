<template>
  <div id="map">
    <MglMap :accessToken="accessToken" :mapStyle="mapStyle"
    :center="center" :zoom="zoom">
      <MglMarker :coordinates="coordinates"/>
    </MglMap>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap,  MglMarker } from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglMarker
  },
  data() {
    return {
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
div{
  width: 500px;
  height: 500px;
}

</style>
