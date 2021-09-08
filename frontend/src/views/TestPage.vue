<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="800"
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h2 font-weight-regular center">
            {{board.title}}
          </v-list-item-title>
          <v-list-item-subtitle align="right">글 번호 : {{board.boardNo}}<br>
            작성일 : {{ board.regDate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col
              class="text-h2"
              cols="6"
          >
            23&deg;C
          </v-col>
          <v-col cols="6">
            <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sun.png"
                alt="Sunny image"
                width="92"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cloud-download</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>

      <v-slider
          v-model="time"
          :max="6"
          :tick-labels="labels"
          class="mx-4"
          ticks
      ></v-slider>

      <v-list class="transparent">
        <v-list-item
            v-for="item in forecast"
            :key="item.day"
        >
          <v-list-item-title>{{ item.day }}</v-list-item-title>

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">
            {{ item.temp }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text>
          Full Report
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TestPage",
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      search: '',
      /*
      options:{
        page: number,
        itemsPerPage: number,
        sortBy: string[],
        sortDesc: boolean[],
        groupBy: string[],
        groupDesc: boolean[],
        multiSort: boolean,
        mustSort: boolean
      },

       */
      headers: [
        {text: '번호', align: 'start', value: 'boardNo'},
        {text: '제목', align: 'center', value: 'title', width: "60%"},
        {text: '', value: ''},
        {text: '작성자', value: 'writer'},
        {text: '등록일자', value: 'regDate'},
      ],
    }
  },
  methods: {
    showBoard(event, idx) {
      console.log("글 번호: " + idx.item.boardNo)
      this.$router.push({name: 'BoardReadPage', params: {boardNo: String(idx.item.boardNo)}})
    },
  }
}
</script>

<style scoped>

</style>
