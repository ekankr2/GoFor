<template>
  <ul id="example-1">
    <li v-for="(item,idx) in data" :key="idx">
      {{ item.city }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "TestPage",
  data() {
    return {
      data: this.$store.getters.walkVid,
    }
  },
}
</script>

<style scoped>

</style>
