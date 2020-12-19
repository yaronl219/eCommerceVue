<template>
<v-main>
  <div class="store-front-container-page">
      <div class="store-items-container" v-bind:class="{'cart-open':isCartOpen}">
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
import CartDrawer from '../../components/StoreFrontView/CartCmps/CartDrawer.vue';
import ItemPreview from "../../components/StoreFrontView/ItemPreview.vue";
export default {
  components: {
    ItemPreview,
    CartDrawer,
  },
  async created() {
    if (!this.$store.getters.itemsToDisplay) {
        this.loadItems();
    }
  },
  methods: {
    async loadItems() {
      this.$store.dispatch({ type: "loadItems" });
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