<template>
  <v-main>
    <cart-refill-prompt :isOpen="isRefillCartModalOpen" @refill-cart="onRefillCart" @forget-order="onForgetOrder" />
    <div class="store-front-container-page">
      <div
        class="store-items-container"
        v-bind:class="{ 'cart-open': isCartOpen }"
      >
        <item-preview
          v-for="item in $store.getters.itemsToDisplay"
          :key="item._id"
          :item="item"
        />
      </div>
      <cart-drawer />
    </div>
  </v-main>
</template>

<script>
import CartDrawer from "../../components/StoreFrontView/CartCmps/CartDrawer.vue";
import CartRefillPrompt from "../../components/StoreFrontView/CartCmps/CartRefillPrompt.vue";
import ItemPreview from "../../components/StoreFrontView/ItemPreview.vue";
import { cartService } from "../../services/cartService";
export default {
  components: {
    ItemPreview,
    CartDrawer,
    CartRefillPrompt,
  },
  data() {
    return {
      isRefillCartModalOpen: false,
    };
  },
  async created() {
    if (!this.$store.getters.itemsToDisplay) {
      this.loadItems();
    }
    this.checkIfRefillCart();
  },
  methods: {
    async loadItems() {
      this.$store.dispatch({ type: "loadItems" });
    },
    checkIfRefillCart() {
      const savedCart = cartService.getSavedCart();
      if (!savedCart) return
      const itemsInCart = [...this.$store.getters.itemsInCart];
      if (savedCart.cartItems.length !== itemsInCart.length) {
        this.isRefillCartModalOpen = true;
      }
    },
    onRefillCart() {
      this.$store.dispatch({ type: "refillCart" });
      this.$store.dispatch({type: 'toggleCartOpen'})
      this.isRefillCartModalOpen = false
    },
    onForgetOrder() {
        console.log('forget')
        this.$store.dispatch({type: 'emptyCart'})
        cartService.forgetSavedCart()
        this.isRefillCartModalOpen = false
    }
  },
  computed: {
    isCartOpen() {
      return this.$store.getters.isCartOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.store-front-container-page {
  display: flex;
  transition: 0.2s;
}

.store-items-container {
  flex-grow: 1;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 0.75rem;
  transition: 0.2s;
}
</style>