<template>
  <div class="product-management-view-container">
      H
    <product-management-preview v-for="item in itemsToDisplay" :key="item._id" :item="item" />
  </div>
</template>

<script>
import ProductManagementPreview from './ProductManagementPreview.vue';

export default {
  components: { ProductManagementPreview },
  computed: {
    itemsToDisplay() {
      return this.$store.getters.itemsToDisplay;
    },
  },
};
</script>

<style>
</style>