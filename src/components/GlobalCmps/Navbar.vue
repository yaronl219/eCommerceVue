<template>
  <v-app-bar app id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/admin">Store Manager</router-link> |
    <router-link to="/store">Store</router-link>
    <v-icon @click="onClickCart">mdi-cart</v-icon>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
      onClickCart() {
          
          this.$store.dispatch({type:'toggleCartOpen'})
      }
  },
};
</script>

<style>
#nav {
    left: 0px !important;
    right: 0px !important;
}
</style>