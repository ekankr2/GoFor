<template>
  <div class="page">
    <span class="white--text">{{ randomVid }}, location: {{ this.$store.getters.currentCity}}
    country: {{ this.$store.getters.currentCountry}}</span>
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
        <v-list-item class="my-2" link router :to="items[0].route">
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
        <v-btn class="my-5 ml-10" @click.stop.prevent="sound"><v-icon class="mr-3">volume_up</v-icon>Street Sound</v-btn>
      </v-list>
    </v-navigation-drawer>
    <!--
    <span>Location : {{ currentCity }}, {{ currentCountry }} link : {{ this.playerOptions.sources[0].src }}</span>
    -->
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
import { mapState,mapGetters } from 'vuex'
import MapLocation from "../components/MapLocation";

require('videojs-youtube')
require('videojs-playlist')
export default {
  components: {
    videoPlayer,
    MapLocation,
  },
  data() {
    return {
      data: this.$store.getters.walkVid,
      items: [
        {
          icon: 'home', text: 'Home', name: 'home', route: '/'
        },
        {
          icon: 'location_on', text: '', name: 'location', route: ''
        },
      ],
      drawer: null,
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
          src: this.$store.getters.randomVid,
        }],

        poster: '/static/images/author.jpg',
      },
    }
  },
  created() {
    //this.randomVideo()

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
  },

  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    ...mapState(['walk']),
    ...mapGetters(['randomVid','walkVid']),

  },
  methods: {
    // player is ready
    playerReadied(player) {
      this.playerOptions.muted = true
      console.log('player ready!', player)
    },
    sound(){
      this.playerOptions.muted  = !this.playerOptions.muted
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
      this.playerOptions.sources[0].src = videoUrl;
    },
    noiseEffect() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      },1500)
    },
    onPlayerEnded() {
      this.loading = true;
      this.randomVideo()
      setTimeout(() => {
        this.loading = false;
      },1500)
    }
  },
  /*
  watch: {
    options: {
      deep: true,
      handler(options, oldOptions) {
        this.dispose(() => {
          if (options && options.sources && options.sources.length) {
            this.initialize()
          }
        })
      }
    }
  }

   */
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
