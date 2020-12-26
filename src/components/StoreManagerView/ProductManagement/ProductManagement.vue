<template>
  <div class="product-management-view-container management-main-view">
    <v-card-title> Product Catalog</v-card-title>
    <text-filter />
    <div class="items-container">
        
        <product-categoris-container />
    </div>
  </div>
</template>

<script>

import TextFilter from "./TextFilter";
import ProductCategorisContainer from './ProductCategorisContainer.vue';

export default {
  components: { TextFilter, ProductCategorisContainer },
  computed: {
    itemsToDisplay() {
      return this.$store.getters.itemsToDisplay;
    },
  },
    async created() {
      this.loadItems()
  },
  methods: {
    async loadItems() {
      this.$store.dispatch({ type: "loadItems" });
    },
  },
};
</script>

<style lang="scss" scoped>
.items-container {
  padding: 0.5rem;
  h2 {
      margin-bottom: 1rem;
  }
}


</style>