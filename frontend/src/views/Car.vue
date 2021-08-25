<template>
  <div class="page">
    <!-- + icon -->
    <v-btn color="secondary" class="right mr-1 mt-1" fab x-small dark
           @click.stop="drawer = !drawer"><v-icon>add</v-icon></v-btn>

    <v-navigation-drawer right v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item class="mb-5"
            v-for="item in items" :key="item.name" link router :to="item.route">
          <v-list-item-icon >
            <v-icon class="pt-2">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-regular py-2">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <MglMap
          :mapbox-gl="mapbox-gl"
          :accesToken="accessToken"
          :mapStyle.sync="mapStyle"
          @load="onMapLoaded"/>
      </v-list>
    </v-navigation-drawer>

    <div class="video-container">
      <video src="../assets/videos/noise.mp4" muted autoplay loop v-show="loading"></video>
      <video-player ref="videoPlayer" v-show="!loading"
                    :options="playerOptions"
                    class="player video-js vjs-big-play-button" @ended="onPlayerEnded($event)">
      </video-player>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import cityData from "../assets/car.json"
import Mapbox from "mapbox-gl"
import { MglMap } from "vue-mapbox"

require('videojs-youtube')
require('videojs-playlist')
export default {
  components: {
    videoPlayer,
    MglMap
  },
  data() {
    return {
      drawer: null,
      items: [
        {
          icon: 'home', text: 'Home', name: 'home', route: '/'
        },
        {
          icon: 'location_on', text: '', name: 'location', route: ''
        },
      ],
      accessToken: "pk.eyJ1IjoiZWthbmtyMiIsImEiOiJja3NxcGJkYm4wZTRqMm9wZzJibnlmdW1jIn0.uRDczh2Hp1oEdBXRhD4Gcg",
      mapStyle: "mapbox://styles/ekankr2/cksqpjzn91hwf17q78drfotch",
      data: cityData,
      selected_city: '',
      selected_video: '',
      currentVideo: '',
      videoUrl: '',
      currentCity: '',
      currentCountry: '',
      loading: true,
      playerOptions: {

        showinfo: false,
        controls: false,
        rel: false,
        modestbranding: true,
        allowFullscreen: true,
        start: 60,
        autoplay: true,
        playsinline: true,
        muted: true,
        //fluid: true, // full screen
        //width: 1500,
        //fill: true,
        aspectRatio: "16:9",

        controlBar: false,
        bigPlayButton: false,
        loadingSpinner: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        techOrder: ["youtube"],
        sources: [{
          type: "video/youtube",
          //src: "https://www.youtube.com/watch?v=vifIDKDrfq4&ab"
          src: '',
        }],

        poster: "/static/images/author.jpg",
      },
    }
  },
  created() {
    this.randomVideo()
    this.mapbox = Mapbox;
    this.map = null;
  },
  mounted() {
    this.noiseEffect()
  },

  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },

  },
  methods: {
    // player is ready
    playerReadied(player) {
      this.playerOptions.muted = true
      console.log('player ready!', player)
    },
    onMapLoaded(event){
      this.map = event.map
    },
    randomVideo() {
      const selected_city = Math.floor(Math.random() * this.data.length);
      const selected_video = Math.floor(Math.random() * this.data[selected_city].video_id.length);
      const currentVideo = this.data[selected_city].video_id[selected_video];
      const videoUrl = 'https://www.youtube.com/watch?v=' + currentVideo + '&t=40';
      const currentCity = this.data[selected_city].city
      const currentCountry = this.data[selected_city].country
      this.currentCity = currentCity
      this.currentCountry = currentCountry
      this.selected_city = selected_city
      this.selected_video = selected_video
      this.currentVideo = currentVideo
      this.items[1].text = currentCity + ", " + currentCountry
      this.playerOptions.sources[0].src = videoUrl;
    },
    noiseEffect() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      },1500)
    },
    onPlayerEnded() {
      this.noiseEffect()
      this.randomVideo()
    }
  },
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}
.page{
  background: #000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.video-container{
  background: #000;
  position: absolute;
  top: 45px;
  bottom: 0;
  width: 100%;


}
.player{
  top: -45px;
  width: 100%;
  pointer-events: none;
}



</style>
