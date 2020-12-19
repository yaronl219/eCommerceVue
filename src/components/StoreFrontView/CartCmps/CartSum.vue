<template>
  <div class="cart-sum-container">
      <v-btn width="100%" color="success" :disabled="!$store.getters.totalSum" class="checkout-btn" @click="onClickCheckout">
          <span>Checkout</span>
          <span>${{$store.getters.totalSum}}</span>
      </v-btn>
  </div>
</template>

<script>
export default {
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