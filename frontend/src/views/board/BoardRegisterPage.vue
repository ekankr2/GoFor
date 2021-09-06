<template>
  <div align="center">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="12">

          <router-link :to="{ name: 'BoardListPage' }">
            <v-btn class="right">취소</v-btn>
          </router-link>

    <h2 class="mt-15">게시물 작성</h2>

    <board-register-form class="mt-8" @submit="onSubmit"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BoardRegisterForm from '@/components/board/BoardRegisterForm.vue'
import axios from 'axios'
export default {
  name: 'BoardRegisterPage',
  components: {
    BoardRegisterForm
  },
  methods: {
    onSubmit (payload) {
      const { title, content, writer } = payload
      axios.post('http://localhost:7777/board/register', { title, writer, content })
          .then(res => {
            alert('등록 성공! - ' + res)
            console.log('게시물 번호: ' + res.data.boardNo.toString())
            this.$router.push({
                name: 'BoardListPage',
                //params: { boardNo: res.data.boardNo.toString() }
            })
          })
          .catch(res => {
            alert(res.response.data.message)
          })
    },
  }
}
</script>
