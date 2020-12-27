<template>
  <v-app-bar app id="nav">
    <div class="logo-container">
      <router-link to="/"><h1>myShop</h1></router-link>
    </div>
    <div class="nav-links">
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Store Manager</router-link> |
      <router-link to="/store">Store</router-link>
      <div
        class="cart-icon-container"
        v-if="isStore"
        v-bind:class="{ 'cart-open': $store.getters.isCartOpen }"
      >
      <v-badge :content="$store.getters.itemsInCart.length" :value="!!$store.getters.itemsInCart.length" overlap>
        <v-icon  @click="onClickCart">mdi-cart</v-icon>
      </v-badge>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isStore() {
      if (this.$route.path === "/store") return true;
      return false;
    },
  },
  methods: {
    onClickCart() {
      this.$store.dispatch({ type: "toggleCartOpen" });
    },
  },
};
</script>

<style lang="scss">
#nav {
  left: 0px !important;
  right: 0px !important;
}

.logo-container {
  flex-grow: 1;
  font-size: 0.75rem; 
  a {
    text-decoration: none;
  }
}

.nav-links {
  width: 40%;
  max-width: 25rem;
  min-width: 15rem;
  display: flex;
  justify-content: space-around;
}

@media screen and (max-width: 600px) {
  .cart-icon-container {
    position: fixed;
    right: 1rem;
    top: 7.5rem;
    padding: 0.625rem;
    transition: 0.15s;
    border-radius: 50%;
    background-color: rgba(239, 239, 239, 0.7);
    &:hover {
      background-color: rgba(180, 180, 180, 0.7);
    }
  }

  .cart-open {
    transform: translateY(-3.5rem);
  }
}
</style>