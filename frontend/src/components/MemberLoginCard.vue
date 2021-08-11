<template>
  <v-dialog elevation="15" v-model="loginDialog" persistent max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="white" class="btn-flat" v-on="on" v-bind="attrs">로그인</v-btn>
    </template>
    <v-card elevation="15">
      <!-- card image -->
      <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
      ></v-img>
      <!-- card title -->
      <v-card-title class="headline text-h4">
        Sign In
      </v-card-title>
      <!-- card contents -->
      <v-card-text class="pa-3">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <input placeholder="Enter your ID" v-model="userInfo.pw" id="account"
                     type="text" class="my-3 px-auto">

            </v-flex>
            <v-flex xs12>
              <input placeholder="Enter your Password" v-model="userInfo.pw" id="password"
                     type="password" class="my-3 px-auto">
              <!-- <label for="password">비밀번호</label> -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <!-- divide line -->
      <v-divider class="mx-5 my-3"></v-divider>
      <!-- buttons -->
      <v-card-actions>
        <v-btn color="teal darken-1" class="text-button"  text @click="btnLoginClick($event)">
          cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-1" class="text-button" text @click="btnLoginClick($event)">
          Submit
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
      if ($event.target.innerHTML == " Submit ") {
        alert('로그인이 완료되었습니다!')
        console.log("입력된 정보 - 아이디: " + this.userInfo.id +
            ", 비밀번호: " + this.userInfo.pw)
        this.loginDialog = false
      } else if ($event.target.innerHTML == " cancel ") {
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