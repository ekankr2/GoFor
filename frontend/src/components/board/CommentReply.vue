<template>
  <v-card-actions>
    <v-textarea @focus="setWriter" solo auto-grow class="mt-8 ml-5 mr-10"
                rows="3" row-height="20" placeholder="Reply to Comment"
                v-model="content"></v-textarea>
    <v-btn @click="registerReply" v-show="content" text class="py-9">Submit</v-btn>
  </v-card-actions>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentReply",
  props: {
    comment: {
      type: Object,
      required: true,
    },
    replies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      content: '',
      writer: '',
    }
  },
  methods: {
    registerReply() {
      const { writer, content } = this
      const { commentNo } = this.comment
      axios.post(`http://localhost:7777/reply/register/${commentNo}`, { writer, content })
          .then(() => {
            alert('reply complete')
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
