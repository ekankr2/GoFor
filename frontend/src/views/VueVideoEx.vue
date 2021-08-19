<template>
  <div class="video-container">

    <video-player  ref="videoPlayer"
                 :options="playerOptions"
                 class="player video-js vjs-big-play-button">
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
</template>

<script>
import { videoPlayer } from 'vue-video-player'

require('videojs-youtube')
require('videojs-playlist')
export default {
  components: {
    videoPlayer,

  },
  data() {
    return {

      playerOptions: {

        showinfo: false,
        allowFullscreen: true,
        controls: false,
        start: 60,
        autoplay: true,
        playsinline: true,
        muted: true,
        fluid: true,
        controlBar: false,
        bigPlayButton: false,
        loadingSpinner: false,
        width: "1561",
        height: "878",

        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        techOrder: ["youtube"],
        sources: [{
          type: "video/youtube",
          src: "https://www.youtube.com/watch?v=xjS6SftYQaQ"
        }, {
            type: "video/youtube",
            src: "https://www.youtube.com/watch?v=P_A2kNpyQBs&ab"
          }],

        poster: "/static/images/author.jpg",
      }
    }
  },
  mounted() {
    console.log('this is current player instance object', this.player)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
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
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  }
}
</script>

<style scoped>
.video-container{
  position: absolute;
  width: 100%;
  height: 100vh;
}

.player{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
