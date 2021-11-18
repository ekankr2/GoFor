<template>
  <div>
    <board-read :board-no="boardNo"/>
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
      axios.delete(`https://goforbackend.herokuapp.com/board/${boardNo}`)
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
