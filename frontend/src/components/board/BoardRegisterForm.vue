<template>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="Title here" class="mt-n1" v-model="title">
    <input type="text" class="mt-5"  disabled v-model="writer">
    <input type="text" class="mt-5" placeholder="YouTube Link" v-model="link">
    <v-textarea filled auto-grow class="mt-8"  rows="4" row-height="80" placeholder="Description"
              v-model="content"></v-textarea>

    <div>
      <v-btn type="submit">Register</v-btn>
    </div>
  </form>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'BoardRegisterForm',
  data () {
    return {
      title: '',
      writer: '',
      link: '',
      content: ''
    }
  },
  computed: {
    ...mapState(["session"])
  },
  mounted() {
    this.writer = this.$store.state.session.member_id
  },
  methods: {
    onSubmit () {
      const { title, writer, content, link } = this
      this.$emit('submit', { title, writer, content, link })
    }
  }
}
</script>
