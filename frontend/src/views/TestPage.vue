<template>
  <div>
    {{ comments }}
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "TestPage",
  computed: {
    ...mapState(["comments"])
  },
  data () {
    return {
    }
  },
  mounted() {
    this.fetchCommentList()
  },
  methods: {
    ...mapActions(["fetchCommentList"]),
    Done () {
      const { title, content } = this
      this.$emit('submit', { title, content })
    },
    cancel() {
      this.$router.push({ name: 'BoardReadPage' })
    }
  }
}
</script>

<style scoped>
.v-list-item{
  min-height: 200px;
}
</style>
