<template>
  <v-card-actions v-if="this.$store.state.session">
    <v-textarea @focus="setWriter" solo auto-grow class="mt-8 ml-5" rows="3" row-height="20" placeholder="댓글을 남겨보세요"
                v-model="content"></v-textarea>
    <v-btn @click="onClick" text class="py-9">Comment</v-btn>
  </v-card-actions>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "BoardCommentRegister",
  props: {
    board: {
      type: Object,
      required: true,
    },
    computed: {
      ...mapState(["session"])
    },
  },
  data() {
    return {
      content: '',
      writer: '',
    }
  },
  methods: {
    onClick() {
      const { writer, content } = this
      const { boardNo } = this.board

      axios.post(`http://localhost:7777/comment/register/${boardNo}`, { writer, content })
          .then(() => {
            alert('댓글 등록 성공!')
            window.location.reload();
          })
          .catch(res => {
            alert(res.response.data.message)
          })
    },
    setWriter() {
      const temp = this.$store.state.session.member_id
      this.writer = temp
    }
  }
}
</script>

<style scoped>

</style>
