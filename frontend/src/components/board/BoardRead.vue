<template>
  <div>
    <v-card class="mx-auto mt-11"
            max-width="800">
      <v-btn text class="py-8 mb-n5" @click="goBack"><v-icon x-large>keyboard_arrow_left</v-icon></v-btn>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h2 mb-5 font-weight-regular center">
            {{board.title}}
          </v-list-item-title>
          <v-list-item-subtitle align="right">글 번호 : {{board.boardNo}}<br>
            작성일 : {{ board.regDate }}</v-list-item-subtitle>
          <v-list-item-subtitle><v-btn text @click="onDelete">delete</v-btn>
            <v-btn text @click="onModify">Edit</v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-text>
        <v-row align="center">
          <v-col class="mt-3" cols="12">
            <v-btn text :href="link" target="_blank" class="text-body-2 ml-n5 mt-n2">
              <v-icon>insert_link</v-icon>YouTube Link</v-btn>
            <div class="text-body-1 right">youtube.com</div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-row align="center">
          <v-col class="text-h5 mt-10" cols="12">
            {{ board.content }}
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text>
          Comment
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BoardRead",
  props: {
    board: {
      type: Object,
      required: true
    },
    boardNo: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      link: "www.youtube.com",
    }
  },
  methods: {
    onDelete () {
      const { boardNo } = this.board
      axios.delete(`http://localhost:7777/board/${boardNo}`)
          .then(() => {
            alert('삭제 성공!')
            this.$router.push({ name: 'BoardListPage' })
          })
          .catch(err => {
            alert(err.response.data.message)
          })
    },
    onModify() {
      this.$router.push({name: 'BoardModifyPage', params: this.boardNo})
    },
    goBack() {
      this.$router.push({ name: 'BoardListPage' })
    }
  }
}
</script>

<style scoped>

</style>
