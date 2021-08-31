<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">Button</v-btn>
      </template>
      <span>hello</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "TestPage",
  data() {
    return {

    }
  },
}
</script>

<style scoped>

</style>
