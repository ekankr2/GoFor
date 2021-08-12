<template>
  <v-container>
    <v-row>
      <v-col cols="12">
    <form @submit.prevent="onSubmit">
      <h3>회원 가입 양식</h3>
      <table>
        <tr>
          <td>아이디</td>
          <td><input type="text" v-model="id"></td>
        </tr>
        <tr>
          <td>비밀번호</td>
          <td><input type="password" v-model="pw"></td>
        </tr>
        <tr>
          <td>이름</td>
          <td><input type="password" v-model="name"></td>
        </tr>
        <tr>
          <td>이메일</td>
          <td><input type="password" v-model="email"></td>
        </tr>
      </table>

      <div class="center-align mt-5">
      <router-link :to="{ name: 'Home' }">
        <v-btn class="px-16 grey darken-1 white--text">취소</v-btn>
      </router-link>
        <v-btn type="submit" class="ml-5 px-16 grey darken-1 white--text">등록</v-btn>
      </div>
    </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MemberRegisterForm"
}
</script>

<style scoped>

</style>