<template>
  <div>

    <div class="video-container">
    <video-player ref="videoPlayer"
                 :options="playerOptions"
                 class="player video-js vjs-big-play-button ">
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
//import cityData from "../assets/data.json"


require('videojs-youtube')
require('videojs-playlist')
export default {
  components: {
    videoPlayer,

  },
  data() {
    return {
      //data: cityData,
      selected_city: '',
      selected_video: '',
      currentVideo: '',
      videoUrl: '',
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
          src: "https://www.youtube.com/watch?v=xjS6SftYQaQ"
        },
          {
            type: "video/youtube",
            src: "https://www.youtube.com/watch?v=P_A2kNpyQBs&ab"
          }],

        poster: "/static/images/author.jpg",
      },
      videos: [{
        src: "https://www.youtube.com/watch?v=xjS6SftYQaQ"
      },
        {
          src: "https://www.youtube.com/watch?v=P_A2kNpyQBs&ab"
        },
        {
          src: "https://www.youtube.com/watch?v=WUILKugXouY"
        },
      ]
    }
  },
  created() {
    const selected_city = Math.floor(Math.random() * this.data.length);
    const selected_video = Math.floor(Math.random() * this.data[selected_city].video_id.length);
    const currentVideo = this.data[selected_city].video_id[selected_video];
    const videoUrl = 'https://www.youtube.com/watch?v=' + currentVideo;
    this.selected_city = selected_city
    this.selected_video = selected_video
    this.currentVideo = currentVideo
    this.videoUrl = videoUrl

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
    },
    nextVid() {
        this.playerOptions.sources[0].src = this.videoUrl;
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120vh;


  display: flex;
  flex-direction: column;
}
.player{
  width: 100%;
}



</style>
