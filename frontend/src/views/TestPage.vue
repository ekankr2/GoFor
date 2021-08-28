<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="mx-auto" max-width="400">
        <v-card-title class="white--text orange darken-4">
          Select City

          <v-spacer></v-spacer>

          <v-btn color="white"
              class="text--primary" fab small>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card elevation="16" max-width="400" min-width="400" class="mx-auto">
          <v-simple-table height="300px">
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Calories
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in desserts"
                  :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>

      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "TestPage",
  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
  computed: {

  }
}
</script>

<style scoped>

</style>
