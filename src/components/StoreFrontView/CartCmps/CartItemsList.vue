<template>
  <div class="cart-items-list">
    <div v-if="!itemsInCart.length" class="empty-state-container">
      <cart-empty />
    </div>
    <div class="cart-items-container">
      <ul>
          <li v-for="(item,idx) in itemsInCart" :key="item.id+idx">
              <div class="seperator"></div>
              <cart-item :cartItem="item" />
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CartEmpty from './CartEmpty.vue';
import CartItem from './CartItem.vue';
export default {
  components: { CartItem, CartEmpty },
  computed: {
    itemsInCart() {
      return this.$store.getters.itemsInCart;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-items-list {
  height: 100%;
  // min-height: 75vh;
}

ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
  .seperator {
      background-color: rgba(32,32,32,0.05);
      margin: 0.75rem 0rem;
      height: 1px;
  }
}
</style>