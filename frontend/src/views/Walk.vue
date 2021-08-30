<template>
  <div class="page">
    <span class="white--text">{{ parentValue }}</span>
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
        <v-list-item class="my-2 mt-n1 mb-n1" link router :to="items[0].route">
          <v-list-item-icon><v-icon class="pt-2">{{ items[0].icon }}</v-icon></v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-regular py-2">Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense class="mt-1">
        <v-list-item>
          <map-location></map-location>
        </v-list-item>
        <v-divider></v-divider>
        <v-btn class="my-4 ml-15" color="transparent" @click.stop.prevent="sound"><v-icon class="mr-3">volume_up</v-icon>Sound</v-btn>

        <select-city-box @changeVideo="changeVideo"></select-city-box>
      </v-list>
    </v-navigation-drawer>
    <div class="video-container">
      <!-- noise screen-->
      <video src="../assets/videos/noise.mp4" muted autoplay loop v-show="loading"></video>

      <video-player ref="videoPlayer" v-show="!loading"
                    :options="playerOptions"
                    class="player video-js vjs-big-play-button" @ended="onPlayerEnded($event)">
        <!--
        title="you can listen some event if you need"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)">

        title="or listen state change"
        @statechanged="playerStateChanged($event)"

        title="The prepared event will be triggered after the videojs program instance completes, and its callback player object is the videojs callback function in this context"
        @ready="playerReadied"> -->
      </video-player>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import { mapState,mapActions } from 'vuex'
import MapLocation from "../components/MapLocation";
import SelectCityBox from "../components/SelectCityBox";

require('videojs-youtube')
require('videojs-playlist')
export default {
  components: {
    SelectCityBox,
    videoPlayer,
    MapLocation,
  },
  data() {
    return {
      data: '',
      items: [
        {
          icon: 'home', text: 'Home', name: 'home', route: '/'
        },
        {
          icon: 'location_on', text: '', name: 'location', route: ''
        },
      ],
      drawer: null,
      loading: true,
      parentValue: '',
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

        poster: '/static/images/author.jpg',
      },
    }
  },
  mounted() {
    /*
    // console.log('this is current player instance object', this.player)
    setTimeout(() => {
      console.log('dynamic change options', this.player)
      // change src
      this.playerOptions.sources[0].src = 'https://www.youtube.com/watch?v=P_A2kNpyQBs&ab';

      // change item
      // this.$set(this.playerOptions.sources, 0, {
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // })
      // change array
      // this.playerOptions.sources = [{
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // }]
      this.player.muted(false)
    }, 5000)
    */
    this.noiseEffect()
    this.fetchRandom()
  },

  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    ...mapState(['randomWalk']),
  },
  methods: {
    ...mapActions(['getRandomWalk']),
    playerReadied(player) {
      this.playerOptions.muted = true
      console.log('player ready!', player)
    },
    changeVideo(selectedUrl) {
      this.parentValue = selectedUrl
      this.playerOptions.sources[0].src = selectedUrl
    },
    fetchRandom() {
      this.getRandomWalk()
      this.data = this.randomWalk
      const random = Math.floor(Math.random() * this.randomWalk.video_id.length)
      this.playerOptions.sources[0].src =
          'https://www.youtube.com/watch?v=' + this.randomWalk.video_id[random] + '&t=40'
    },
    sound(){
      this.playerOptions.muted  = !this.playerOptions.muted
    },
    noiseEffect() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      },1500)
    },
    onPlayerEnded() {
      this.loading = true;
      this.fetchRandom();
      setTimeout(() => {
        this.loading = false;
      },1500)
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
  top: 40px;
  bottom: 0;
  width: 100%;


}
.player{
  top: -45px;
  width: 100%;
  pointer-events: none;
}



</style>
