<template>
  <div class="product-management-view-container management-main-view">
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
};
</script>

<style lang="scss" scoped>
.items-container {
  padding: 0.5rem;
}


</style>