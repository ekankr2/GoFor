<template>
  <div align="center">
    <h2>Vue + Spring 게시판 읽기</h2>
    <board-read v-if="board" :board="board"/>
    <p v-else>로딩중 ...... </p>
    <router-link :to="{ name: 'BoardModifyPage', params: { boardNo } }">
      게시물 수정
    </router-link>
    <button @click="onDelete">삭제</button>
    <router-link :to="{ name: 'BoardListPage' }">
      게시물 보기
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import BoardRead from "../../components/board/BoardRead";

export default {
  name: "BoardReadPage",
  components: {BoardRead},
  props: {
    boardNo: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['board'])
  },
  created () {
    this.fetchBoard(this.boardNo)
        .catch(err => {
          alert(err.response.data.message)
          this.$router.push()
        })
  },
  methods: {
    ...mapActions(['fetchBoard']),
    onDelete () {
      const { boardNo } = this.board
      axios.delete(`http://localhost:7777/vueboard/${boardNo}`)
          .then(() => {
            alert('삭제 성공!')
            this.$router.push({ name: 'BoardListPage' })
          })
          .catch(err => {
            alert(err.response.data.message)
          })
    }
  }
}
</script>

<style scoped>

</style>
