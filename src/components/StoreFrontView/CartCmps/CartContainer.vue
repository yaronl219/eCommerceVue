<template>
  <div class="cart-container">
    <div class="header-container">
      <h3>Cart</h3>
      <div class="seperator" />
    </div>
    <div class="cart-items-container">
      <cart-items-list />
    </div>
    <div v-if="includeCheckoutBtn" class="cart-sum-container">
      <cart-sum />
    </div>
  </div>
</template>

<script>
import CartItemsList from "./CartItemsList.vue";
import CartSum from "./CartSum.vue";
export default {
  props: ["includeCheckoutBtn"],
  components: { CartItemsList, CartSum },
};
</script>

<style scoped>
.cart-container {
  padding: 0.5rem;
  position: relative;
  height: 100%;
}

.header-container {
  text-align: center;
  position: absolute;
  width: 100%;
  left: 0;
  padding: 0.5rem;
  background-color: white;
}

.cart-items-container {
  padding: 1.5rem 0 3.25rem;
  overflow: scroll;
  min-height: 100%;
}

.cart-sum-container {
  background-color: white;
  position: fixed;
  bottom: 0px;
  padding: 0.5rem 1rem 0.5rem 0rem;
  width: 100%;
}
.seperator {
  background-color: #999;
  width: 100%;
  height: 1px;
}
</style>