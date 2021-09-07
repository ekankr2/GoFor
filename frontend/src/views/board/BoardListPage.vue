<template>
  <div>
    <v-container fluid>
      <h3 align="center">Recommend Us Videos</h3>

        <v-btn @click="recommend">Recommend</v-btn>

    </v-container>
    <!--<board-list :boards="boards"/>-->
    <test-page :boards="boards"></test-page>
  </div>
</template>

<script>
//import BoardList from '@/components/board/BoardList.vue'
import { mapState, mapActions } from 'vuex'
import TestPage from "../TestPage";
export default {
  name: 'BoardListPage',
  components: {
    TestPage,
    //BoardList
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
