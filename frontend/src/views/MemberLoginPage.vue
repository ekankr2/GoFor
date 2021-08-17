<template>
  <div>
    <div align="center">
      <h2>로그인</h2>
    </div>
    <member-login-form @submit="onSubmit"/>
    <v-spacer></v-spacer>
    <v-btn tile color="teal" @click="showSession">
      <v-icon left>
        ads_click
      </v-icon>
      세션 보기
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn tile color="teal" @click="removeSession">
      <v-icon left>
        ads_click
      </v-icon>
      세션 끊기
    </v-btn>
  </div>
</template>

<script>
import MemberLoginForm from '@/components/MemberLoginForm.vue'
import axios from 'axios'
export default {
  name: 'MemberLoginPage',
  components: {
    MemberLoginForm
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    onSubmit (payload) {
      const { member_id, member_pw } = payload
      axios.post('http://localhost:7777/member/login', { member_id, member_pw })
          .then(res => {
            if (res.data != "") {
              alert('로그인 성공! - ' + res.data)
              this.isLogin = true;
            } else {
              alert('아이디와 비밀번호를 확인해주세요. ' + res.data)
            }
          })
          .catch(res => {
            alert(res.response.data.message)
          })
    },
    showSession () {
      if (this.isLogin == true) {
        axios.post('http://localhost:7777/member/needSession')
            .then(res => {
              if (res.data == true) {
                alert('세션 정보 유지! - ' + res.data)
              } else {
                alert('세션 정보 유지 안되는 중! - ' + res.data)
              }
            })
            .catch(res => {
              alert(res.response.data.message)
            })
      } else {
        alert('먼저 로그인부터 하세요!')
      }
    },
    removeSession () {
      axios.post('http://localhost:7777/member/removeSession')
          .then(res => {
            this.isLogin = res.data
          })
    }
  }
}
</script>