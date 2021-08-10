<template>
  <v-dialog v-model="loginDialog" persistent max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn text color="white" v-on="on">로그인</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline text-h4">
        로그인
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="아이디" v-model="userInfo.id" required>
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="비밀번호" v-model="userInfo.pw"
                            type="password" required>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-1" text @click="btnLoginClick($event)">
          취소
        </v-btn>
        <v-btn color="teal darken-1" text @click="btnLoginClick($event)">
          확인
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "MemberLoginCard",
  data() {
    return{
      loginDialog: false,
      userInfo: {
        id: '',
        pw: ''
      },
    }
  },
  methods: {
    btnLoginClick ($event) {
      if ($event.target.innerHTML == " 확인 ") {
        alert('로그인이 완료되었습니다!')
        console.log("입력된 정보 - 아이디: " + this.userInfo.id +
            ", 비밀번호: " + this.userInfo.pw)
        this.loginDialog = false
      } else if ($event.target.innerHTML == " 취소 ") {
        this.loginDialog = false
      }
      this.userInfo.email = ''
      this.userInfo.password = ''
    }
  },
  watch: {
    group () {
      this.loginDialog = false
    }
  }
}
</script>

<style scoped>

</style>