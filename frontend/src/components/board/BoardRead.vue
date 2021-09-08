<template>
  <div v-if="board">
    <v-card class="mx-auto mt-11"
            max-width="800" min-height="500">
      <v-btn text class="py-8 mb-n8" @click="goBack"><v-icon x-large>keyboard_arrow_left</v-icon></v-btn>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h2 mb-5 font-weight-regular center">
            {{board.title}}
          </v-list-item-title>
          <v-list-item-subtitle align="right">글 번호 : {{board.boardNo}}<br>
            작성일 : {{ board.regDate }}</v-list-item-subtitle>
          <v-list-item-subtitle class="mb-n4"><v-btn text @click="onDelete">delete</v-btn>
            <v-btn text @click="onModify">Edit</v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-text>
        <v-row align="center">
          <v-col class="mt-3" cols="12">
            <v-btn @click="goLink" text :href="link" target="_blank" class="text-body-2 ml-n5 mt-n2">
              <v-icon>insert_link</v-icon>YouTube Link</v-btn>
            <div class="text-body-1 right">youtube.com</div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-row>
          <v-col class="text-h5 mt-3" cols="12">
            <v-textarea readonly class="text-h6 font-weight-regular my-n2" solo auto-grow rows="4"
                        row-height="50" :value="board.content"></v-textarea>
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider></v-divider>
      <!-- comments v-if logged on-->
      <v-card-actions v-if="this.$store.state.session">
            <v-textarea solo auto-grow class="mt-8 ml-5" rows="3" row-height="20" placeholder="댓글을 남겨보세요"
            ></v-textarea>
        <v-btn text class="py-9">Comment</v-btn>
      </v-card-actions>


    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";
export default {
  name: "BoardRead",
    boardNo: {
      type: String,
      required: true

  },
  computed: {
    ...mapState(['board'])
  },
  data () {
    return {
      link: "https://www.youtube.com/",
    }
  },
  methods: {
    goLink () {
      if(this.link.includes("https://")){
        window.open(this.link, '_blank')
      } else {
        window.open("https://" + this.link, '_blank')
      }
    },
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
.v-list-item{
  min-height: 200px;
}
</style>
