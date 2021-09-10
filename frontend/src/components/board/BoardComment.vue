<template>
  <v-card-actions v-if="this.$store.state.session">
    <v-textarea solo auto-grow class="mt-8 ml-5" rows="3" row-height="20" placeholder="댓글을 남겨보세요"
                v-model="content"></v-textarea>
    <v-btn @click="onClick" text class="py-9">Comment</v-btn>
  </v-card-actions>
</template>

<script>
import axios from "axios";

export default {
  name: "BoardComment",
  props: {
    board: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      content: '',
    }
  },
  methods: {
    onClick() {
      const { content } = this
      const { writer, boardNo } = this.board
      axios.post(`http://localhost:7777/comment/register/${boardNo}`, { writer, content })
          .then(() => {
            alert('댓글 등록 성공!')
            window.location.reload();
          })
          .catch(res => {
            alert(res.response.data.message)
          })
    }
  }
}
</script>

<style scoped>

</style>
