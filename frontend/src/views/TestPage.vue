<template>
  <div>
    <v-card>
      <v-card-title>
        <h3>게시물 목록</h3>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table @click:row="showBoard"
          :headers="headers"
          :items="boards"
          :search="search"
      >
      </v-data-table>

    </v-card>
  </div>
</template>

<script>
export default {
  name: "TestPage",
  props: {
    boards: {
      type: Array
    }
  },
  data () {
    return {
      search: '',
      /*
      options:{
        page: number,
        itemsPerPage: number,
        sortBy: string[],
        sortDesc: boolean[],
        groupBy: string[],
        groupDesc: boolean[],
        multiSort: boolean,
        mustSort: boolean
      },

       */
      headers: [
        {text: '번호', align: 'start', value: 'boardNo'},
        {text: '제목', align: 'center', value: 'title', width: "60%"},
        {text: '', value: ''},
        {text: '작성자', value: 'writer'},
        {text: '등록일자', value: 'regDate'},
      ],
    }
  },
  methods: {
    showBoard(event, idx) {
      console.log(event)
      console.log(idx.item.boardNo)
      this.$router.push({name: 'BoardReadPage', params: {boardNo: idx.item.boardNo}})
    },
  }
}
</script>

<style scoped>

</style>
