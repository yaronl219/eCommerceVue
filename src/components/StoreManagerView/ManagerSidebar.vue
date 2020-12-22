<template>
  <v-card flat>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      permanent
      clipped
    >
    
      <v-list-item>
          <v-icon >mdi-menu</v-icon>
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="onClickLink(item.path)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>

  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Products', icon: 'mdi-cube', path:'/products' },
          { title: 'Orders', icon: 'mdi-format-list-checkbox', path: '/orders' },
          { title: 'Graphs', icon: 'mdi-chart-areaspline-variant', path: '/graphs' },
        ],
        mini: true,
      }
    },
    methods: {
        onClickLink(path) {
            this.$router.push(`/admin${path}`)
        }
    }
  }

</script>

<style>

</style>