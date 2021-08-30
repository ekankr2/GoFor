<template>
  <div>
    <v-btn @click="getRandomWalk">check</v-btn>
    <label>{{ randomWalk }}</label>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "TestPage",
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['randomWalk'])
  },
  mounted() {

  },
  methods: {
    ...mapActions(['getRandomWalk'])
    }
  }
</script>

<style scoped>

</style>
