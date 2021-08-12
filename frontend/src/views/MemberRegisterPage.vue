<template>
  <member-register-form @submit="onSubmit()"></member-register-form>
</template>

<script>
import MemberRegisterForm from "../components/MemberRegisterForm";
import axios from "axios";

export default {
  name: "MemberRegisterPage",
  components: {MemberRegisterForm},
  methods: {
    onSubmit (payload) {
      const { member_id, member_pw, name, email } = payload
      axios.post('http://localhost:7777/jpamember/register', { member_id, member_pw, name, email })
          .then(res => {
            alert('등록 성공! - ' + res)
            this.$router.push({
              name: 'Home',
            })
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