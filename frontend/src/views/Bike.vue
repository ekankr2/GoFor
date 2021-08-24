<template>
  <div>
    <span>Location : {{ currentCity }},{{ currentCountry }} ,link : {{ this.playerOptions.sources[0].src }}</span>
    <div class="video-container">
      <video src="../assets/videos/noise.mp4" muted autoplay loop v-show="loading"></video>
    <video-player ref="videoPlayer" v-show="!loading"
                 :options="playerOptions"
                 class="player video-js vjs-big-play-button " @ended="onPlayerEnded($event)">
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
import cityData from "../assets/bike.json"


require('videojs-youtube')
require('videojs-playlist')
export default {
  components: {
    videoPlayer,

  },
  data() {
    return {
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
        fluid: true, // full screen
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
  },

  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },

  },
  methods: {
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
.video-container{
  background: #000;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}
.player{
  width: 100%;
  pointer-events: none;
}



</style>
