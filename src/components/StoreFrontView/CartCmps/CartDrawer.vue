<template>
  <v-navigation-drawer
    :value="$store.getters.isCartOpen"
    right
    app
    clipped
    stateless
    permenant
    :width="320"
  >
  <cart-container :includeCheckoutBtn="true" />
  </v-navigation-drawer>
</template>

<script>
import CartContainer from './CartContainer.vue';
export default {
  components: { CartContainer },};
</script>

<style>
</style>