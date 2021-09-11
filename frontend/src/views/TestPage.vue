<template>
  <v-card max-width="95%" class="mx-auto" elevation="0">
    {{comment}}
    <div v-for="(item,idx) in comments" :key="idx">

      <!-- delete btn -->
      <v-btn @click="deleteComment(item)" v-if="item.writer === checkUser || checkUser === admin"
             v-show="item.content !== deleted" text class="right deleteBtn mt-1">
        <v-icon>close</v-icon>댓글삭제</v-btn>

      <v-card-title class="text-subtitle-1 font-weight-bold">{{ item.writer }}</v-card-title>
      <v-card-text class="text-body-1 font-weight-light black-text">{{ item.content }}</v-card-text>
      <v-card-text class="grey--text">{{ item.regDate }}</v-card-text>

      <v-divider></v-divider>

    </div>

  </v-card>
</template>

<script>
import {mapActions, mapState} from "vuex";
import axios from "axios";
export default {
  name: "TestPage",
  props: {
    boardNo: {
      type: String,
      required: true
    },
  },
  computed: {
    ...mapState(["comments","comment","board","session"]),
    checkUser() {
      let temp
      if(this.session !== null) {
        temp = this.session.member_id
      } else {
        temp = null
      }
      return temp
    }
  },
  data () {
    return {
      memberCheck : false,
      content : "삭제된 댓글입니다",
      deleted : "삭제된 댓글입니다",
      admin : "admin",
    }
  },
  mounted() {
    this.fetchCommentList(this.boardNo)
  },
  methods: {
    ...mapActions(["fetchCommentList","fetchComment"]),
    Done () {
      const { title, content } = this
      this.$emit('submit', { title, content })
    },
    cancel() {
      this.$router.push({ name: 'BoardReadPage' })
    },
    deleteComment(item) {
      const { content } = this
      axios.put(`http://localhost:7777/comment/${item.commentNo}`, { writer : item.writer, content })
          .then(() => {
            alert('삭제 성공!')
            window.location.reload();
          })
          .catch(err => {
            alert(err.response.data.message)
          })
    }
  }
}
</script>

<style scoped>
.v-list-item{
  min-height: 200px;
}
</style>
