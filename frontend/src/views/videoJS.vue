<template>
  <div id="app">
    <div>Vue and videojs</div>
    <videoplayer :source="source" :vs="videosetting"></videoplayer>
  </div>
</template>

<script>

import { videojs, videoPlayer } from 'vue-video-player'

// Set global option for videojs.
// videojs.options.autoplay = true
videojs.options.techOrder = ["html5", "flash","youtube"]

var videoplayer = Vue.extend({
  data: function() {
    return {
      currPlayer: {},
      playerTemplate: "",
      currSrc: {}
    }
  },
  // options...
  props: ['source','vs'],
  template: "{{{playerTemplate}}}",
  beforeCompile: function() {
    // Generate the template with the first video.
    var currVideo = this.source.videos.shift();
    console.log("beforecompile",currVideo)
    // Parse the Videoplayer.
    this.playerTemplate = "<video id='" + this.source.id + "' class='video-js vjs-big-play-centered' controls width='" + this.vs.videoWidth + "' height='" + this.vs.videoHeight + "'  preload data-setup='{ }'> <source src='" + currVideo.src + "' type='" + currVideo.type + "'></video>"
  },
  ready: function() {
    // Add a listener to the end of the video to continue playing recursively at the end.

    // Create an instance with current player.
    this.currPlayer = videojs(this.source.id)
    var self = this
    // this.prepareLoop();

    // Add an event listener on the player to play the next video.
    this.currPlayer.on('ended', function(){
      this.src({
        src:'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
        type:'application/x-mpegURL'})
      this.load()
      this.play()
    })
  },
  methods: {
    prepareLoop: function() {
      console.log("Remaining Video", this.source.videos.length)
      if (this.source.videos.length > 0) {
        var nextVideo = this.source.videos.shift()
        console.log("Passing next video",nextVideo.src)
        this.playNext(nextVideo)
      } else {
        this.currPlayer.pause()
        console.log("Finished")
      }
    },
    playNext: function(nextVideo) {
      console.log("Adding listener to", this.currPlayer.currentSrc())
      var self = this;

      this.currPlayer.on('ended', function() {
        console.log("Next video (passed)",nextVideo.src)
        this.src(nextVideo)
        this.load()
        this.play()
        console.log("Playing",this.currentSrc())
        //console.log(this)
        //console.log(this.el_)
        // Reload for another video.
        this.currPlayer = videojs(this.source.id)
        self.prepareLoop()
      })
    }
  }
})

Vue.component('videoplayer', videoplayer)

new Vue({
  el: '#app',
  data: {
    msg: 'Hello Vue.js!',
    videosetting: {
      videoWidth: '350',
      videoHeight: '200'
    },
    source: {
      id: 'main-video',
      poster: '',
      videos: [
        {
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        },{
          src: 'https://www.youtube.com/watch?v=7CVtTOpgSyY',
          type: 'video/youtube'
        }, {
          src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
          type: 'application/x-mpegURL'
        },{
          src: 'https://www.youtube.com/watch?v=7CVtTOpgSyY',
          type: 'video/youtube'
        },{
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        }]
    }
  },
  components: {
    videoPlayer
  }
})

//https://www.youtube.com/watch?v=7CVtTOpgSyY
//http://vjs.zencdn.net/v/oceans.mp4

// {
//        src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
//        type: 'application/x-mpegURL'
//      },
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.video-js {
  margin: 0 auto !important;
}

.video-list li {
  margin-bottom: 20px;
}

#app {
  text-align: center;
}
</style>
