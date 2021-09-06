<template>
  <div>
    <v-container fluid>
      <h2>Recommend Us Videos</h2>

        <v-btn @click="recommend">Recommend</v-btn>

    </v-container>
    <board-list :boards="boards"/>
  </div>
</template>

<script>
import BoardList from '@/components/board/BoardList.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'BoardListPage',
  components: {
    BoardList
  },
  computed: {
    ...mapState(['boards', 'session'])
  },
  mounted () {
    this.fetchBoardList()
  },
  methods: {
    ...mapActions(['fetchBoardList']),
    recommend() {
      if(this.session !== null) {
        this.$router.push('/board/create')
      }else{
        alert("로그인 바랍니다!")
      }
    }
  }
}
</script>
