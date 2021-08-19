<template>
  <video-player  ref="videoPlayer"
                 :options="playerOptions"

                 class="videojs vjs-default-skin"
                 controls autoplay
                 width="640" height="264"
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
                 <!--
                 title="or listen state change"
                 @statechanged="playerStateChanged($event)"

                 title="The prepared event will be triggered after the videojs program instance completes, and its callback player object is the videojs callback function in this context"
                 @ready="playerReadied"> -->
  </video-player>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// require('some-videojs-plugin')
require('videojs-youtube')
export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {

        // component options
        start: 0,
        playsinline: false,
        // videojs options
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        techOrder: ["youtube"],
        sources: [{
          type: "video/youtube",
          src: "https://www.youtube.com/watch?v=xjS6SftYQaQ"
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
