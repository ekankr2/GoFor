<template>
  <div>
    <v-card class="mx-auto mt-11"
            max-width="800" min-height="500">

      <v-list-item two-line>
        <v-list-item-content>
          <h3 class="center mt-3">Edit Personal Info</h3>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-text>
        <v-row align="center">
          <v-col class="mt-3" cols="12">
            new ID
            <v-textarea v-model="link" auto-grow solo row-height="10" value="" class="text-body-1"></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-row align="center">
          <v-col class="mt-1" cols="12">
            new name
            <v-textarea v-model="link" auto-grow solo row-height="10" value="" class="text-body-1"></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-row align="center">
          <v-col class="mt-n10" cols="12">
            new Email
            <v-textarea v-model="link" auto-grow solo row-height="10" value="" class="text-body-1"></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-row align="center">
          <v-col class="mt-n10" cols="12">
            new Password
            <v-textarea v-model="link" auto-grow solo row-height="10" value="" class="text-body-1"></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>


      <v-divider></v-divider>
      <!-- comments v-if logged on-->
      <v-card-actions>
        <v-btn text @click="cancel">CANCEL</v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="Done">DONE</v-btn>
      </v-card-actions>


    </v-card>
  </div>
</template>

<script>
export default {
  name: "MemberInfoChangePage",
  methods: {
    data() {
      return {
        link: '',
        content: '',
      }
    },
    Done () {
      const { title, content, link } = this
      this.$emit('submit', { title, content, link })
    },
    cancel() {
      this.$router.push({ name: 'MemberInfoPage' })
    }
  }
}
</script>

<style scoped>

</style>
