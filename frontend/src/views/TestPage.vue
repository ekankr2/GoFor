<template>
  <v-card max-width="95%" class="mx-auto" elevation="0">
    <div v-for="(item,idx) in comments" :key="idx">
      <v-btn v-if="item.writer == session.member_id" text class="right deleteBtn mt-1"><v-icon>close</v-icon>댓글삭제</v-btn>
      <v-card-title class="text-subtitle-1 font-weight-bold">{{ item.writer }}</v-card-title>
        <v-card-text class="text-body-1 font-weight-light black-text">{{ item.content }}</v-card-text>
        <v-card-text class="grey--text">{{ item.regDate }}</v-card-text>

    <v-divider></v-divider>

    </div>

  </v-card>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "TestPage",
  props: {
    boardNo: {
      type: String,
      required: true
    },
  },
  computed: {
    ...mapState(["comments","board","session"])
  },
  data () {
    return {
    }
  },
  mounted() {
    this.fetchCommentList(this.boardNo)
  },
  methods: {
    ...mapActions(["fetchCommentList"]),
    Done () {
      const { title, content } = this
      this.$emit('submit', { title, content })
    },
    cancel() {
      this.$router.push({ name: 'BoardReadPage' })
    },

  }
}
</script>

<style scoped>
.v-list-item{
  min-height: 200px;
}

</style>
