<template>
  <v-main>
    <cart-refill-prompt
      :isOpen="isRefillCartModalOpen"
      @refill-cart="onRefillCart"
      @forget-order="onForgetOrder"
    />
    <div class="store-front-container-page">
      <category-menu-container />
      <div class="category-container">
        <category-preview
          v-for="category in $store.getters.storeCategories"
          :key="category._id"
          :category="category"
        />
      </div>

      <cart-drawer />
    </div>
  </v-main>
</template>

<script>
import CartDrawer from "../../components/StoreFrontView/CartCmps/CartDrawer.vue";
import CartRefillPrompt from "../../components/StoreFrontView/CartCmps/CartRefillPrompt.vue";
import CategoryMenuContainer from "../../components/StoreFrontView/CategoryCmps/CategoryMenuContainer.vue";
import CategoryPreview from "../../components/StoreFrontView/CategoryCmps/CategoryPreview.vue";

import { cartService } from "../../services/cartService";
export default {
  components: {
    CartDrawer,
    CartRefillPrompt,
    CategoryPreview,
    CategoryMenuContainer,
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
      if (!savedCart) return;
      const itemsInCart = [...this.$store.getters.itemsInCart];
      if (savedCart.cartItems.length !== itemsInCart.length) {
        this.isRefillCartModalOpen = true;
      }
    },
    onRefillCart() {
      this.$store.dispatch({ type: "refillCart" });
      this.$store.dispatch({ type: "toggleCartOpen" });
      this.isRefillCartModalOpen = false;
    },
    onForgetOrder() {
      console.log("forget");
      this.$store.dispatch({ type: "emptyCart" });
      cartService.forgetSavedCart();
      this.isRefillCartModalOpen = false;
    },
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
  transition: 0.2s;
}

.category-container {
  flex-grow: 1;
  flex-direction: column;
  padding: 1rem;
}

@media screen and (max-width: 600px){
    .category-container {
        
        padding: 2rem 0 0;
    }
}
</style>