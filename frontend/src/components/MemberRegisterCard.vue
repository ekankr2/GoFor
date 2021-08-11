<template>
  <v-dialog  v-model="registerDialog" persistent max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="white" class="btn-flat" v-on="on" v-bind="attrs">회원가입</v-btn>
    </template>
    <v-card>
      <!-- card image -->
      <v-img
          :src="require('../assets/pic/sunrise.jpg')"
          height="190px"
      ></v-img>
      <!-- card title -->
      <v-card-title class="headline text-h4">
        Sign Up
      </v-card-title>
      <!-- card contents -->
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <input placeholder="아이디" v-model="register.id"
              type="text" class="my-5">
            </v-col>
            <v-col cols="12">
              <input placeholder="비밀번호" v-model="register.pw"
                     type="text" class="my-5">
            </v-col>
            <v-col cols="12" md="8">
              <input placeholder="이름" v-model="register.name"
                     type="text" class="mt-6">
            </v-col>

            <v-col cols="12">
              <input placeholder="이메일" v-model="register.email"
                     type="text" class="mt-6 mb-n2">
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- divide line -->
      <v-divider class="mx-5 my-2"></v-divider>
      <!-- buttons -->
      <v-card-actions>
        <v-btn color="teal darken-1" class="text-button"  text @click="registerDialog = !registerDialog">
          cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-1" class="text-button" text @click="btnRegisterClick($event)">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "MemberRegisterCard",
  data() {
    return {
      registerDialog: false,
      register: {
        id: '',
        pw: '',
        name: '',
        email: '',

      },
    }
  },
  methods: {
    btnRegisterClick ($event) {
      if ($event.target.innerHTML == " Submit ") {
        alert('회원가입이 완료되었습니다!')
        console.log("입력된 정보 - 아이디: " + this.register.id + ", 비밀번호: "
            + this.register.pw + "이름: " + this.register.name + "이메일: " + this.register.email )
        this.registerDialog = false
      } else if ($event.target.innerHTML == " cancel ") {
        this.registerDialog = false
      }
      this.register.id = ''
      this.register.pw = ''
      this.register.name = ''
      this.register.email = ''
    }
  },
}
</script>

<style scoped>

</style>