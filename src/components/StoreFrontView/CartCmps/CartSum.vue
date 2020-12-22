<template>
  <div class="cart-sum-container">
      <v-btn width="100%" color="success" :disabled="!$store.getters.totalSum" class="checkout-btn" @click="onClickCheckout">
          <span>Checkout</span>
          <span><price-container  :price="$store.getters.totalSum" /></span>
      </v-btn>
  </div>
</template>

<script>
import PriceContainer from '../../GlobalCmps/PriceContainer.vue';
export default {
  components: { PriceContainer },
methods: {
    onClickCheckout() {
        if (!this.$store.getters.totalSum) return
        this.$router.push('checkout')
    }
}
};
</script>

<style scoped>
.checkout-btn {
    display: flex;
    justify-content: space-between;
    
}
</style>