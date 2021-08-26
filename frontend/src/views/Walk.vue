<template>
  <div class="page">
    <p class="white--text">{{ randomVid }}</p>
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
        <v-list-item
            v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
import { mapActions, mapState,mapGetters } from 'vuex'

require('videojs-youtube')
require('videojs-playlist')
export default {
  components: {
    videoPlayer,

  },
  data() {
    return {
      data: this.products,
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
          src: '',
        }],

        poster: "/static/images/author.jpg",
      },
    }
  },
  created() {
    this.randomVideo()
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
    this.setProducts()
    this.dbInit()
  },

  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    ...mapState(['db']),
    ...mapGetters(['randomVid']),

  },
  methods: {
    ...mapActions(['setProducts', 'dbInit']),
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      this.playerOptions.muted = true
      console.log('player ready!', player)
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
