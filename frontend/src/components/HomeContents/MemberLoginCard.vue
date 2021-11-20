<template>
  <v-dialog elevation="15" v-model="loginDialog" persistent max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="white" class="btn-flat" v-on="on" v-bind="attrs">로그인</v-btn>
    </template>
    <v-card elevation="15">
      <!-- card image -->
      <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"></v-img>
      <!-- card title -->
      <v-card-title class="headline text-h4 mb-n4">
        Sign In
      </v-card-title>
      <!-- card contents -->
      <form @submit.prevent="onLogin">
      <v-card-text class="pa-3">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <input placeholder="Enter your ID" v-model="member_id"
                     type="text" class="my-3 px-auto" autofocus>

            </v-flex>
            <v-flex xs12>
              <input placeholder="Enter your Password" v-model="member_pw"
                     type="password" class="my-3 px-auto">
              <!-- <label for="password">비밀번호</label> -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <!-- divide line -->
      <v-divider class="mx-5 mt-5 mb-1"></v-divider>
      <!-- buttons -->
      <v-card-actions>
        <v-btn color="teal darken-1" class="text-button"  text @click="loginDialog = !loginDialog">
          cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="teal darken-1" class="text-button" text>
          Submit
        </v-btn>
      </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";

export default {
  name: "MemberLoginCard",
  data() {
    return{
      loginDialog: false,
      member_id: '',
      member_pw: '',

    }
  },
  computed:{
    ...mapState(['session'])
  },
  methods: {
    ...mapActions(['fetchSession']),
    onLogin () {
      if(this.session == null) {
        const {member_id, member_pw} = this
        const name = null
        axios.post('https://goforbackend.herokuapp.com/member/login', {member_id, member_pw, name})
            .then(res => {
              if (res.data !== null) {
                alert(res.data.member_id + "님 환영합니다.")
                this.$cookies.set("user", res.data, '1h')
                this.fetchSession()
                this.loginDialog = false
              } else {
                alert('아이디와 비밀번호를 확인해주세요. ' + res.data)
              }
            })
            .catch(res => {
              console.log(res)
              alert('아이디와 비밀번호를 확인해주세요. ')
            })
      } else {
        alert("이미 로그인 되어 있습니다. 아이디 : " +this.$store.state.session.member_id)
      }
    },
  },
}
</script>

<style scoped>

</style>
