<template>
  <body>
  <div class="container">
    <!-- 4 contents -->
    <div class="box" v-for="a in contents" :key="a.title">
      <div class="videoBx">
        <video :src="a.link" muted autoplay loop></video>
      </div>
      <div class="contentBx">
        <div class="content">
          <h3>{{ a.title }}</h3>
          <p>{{ a.content }}</p>
        </div>
      </div>
    </div>

  </div>
  </body>
</template>

<script>
  export default {
    name: 'Home',

    components: {
    },
    data() {
      return {
        contents: [
          { link: require('@/assets/videos/main1.mp4'), title: 'a Walk', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec leo et quam condimentum varius. In scelerisque, tellus sit amet congue condimentum, erat dui elementum est, nec iaculis est.'},
          { link: require('@/assets/videos/main2.mp4'), title: 'a Bike Ride', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec leo et quam condimentum varius. In scelerisque, tellus sit amet congue condimentum, erat dui elementum est, nec iaculis est.'},
          { link: require('@/assets/videos/main3.mp4'), title: 'a Motorcycle Ride', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec leo et quam condimentum varius. In scelerisque, tellus sit amet congue condimentum, erat dui elementum est, nec iaculis est.'}, { link: require('@/assets/videos/main4.mp4'), title: 'a Drive', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec leo et quam condimentum varius. In scelerisque, tellus sit amet congue condimentum, erat dui elementum est, nec iaculis est.'},
        ]
      }
    }
  }
</script>

<style scoped src="../assets/style/home.css">

</style>