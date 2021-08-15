<template>
  <div>
  <member-register-form @submit="onSubmit"></member-register-form>
  </div>
</template>

<script>
import MemberRegisterForm from "../components/MemberRegisterForm";
import axios from "axios";

export default {
  name: "MemberRegisterPage",
  components: {MemberRegisterForm
  },
  methods: {
    onSubmit (payload) {
      const { member_id, member_pw, name, email } = payload
      axios.post(`http://localhost:7777/member/register`, { member_id, member_pw, name, email })
          .then(res => {
            alert('가입 성공! - ' + res)

          })
          .catch(res => {
            alert(res.response.data.message)
          })
    }
  }
}

</script>

<style scoped>

</style>