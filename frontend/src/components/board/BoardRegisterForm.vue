<template>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="제목을 작성하세요." class="mt-5" v-model="title">
    <input type="text" class="mt-5"  disabled v-model="writer">
    <v-textarea filled auto-grow class="mt-8"  rows="4" row-height="80" placeholder="본문을 작성하면 됩니다."
              v-model="content"></v-textarea>

    <div>
      <v-btn type="submit">등록하기</v-btn>
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
      const { title, writer, content } = this
      this.$emit('submit', { title, writer, content })
    }
  }
}
</script>
