<template>
  <div class="store-manager-page-container">
    <product-management></product-management>
  </div>
</template>

<script>
import ProductManagement from '../../components/StoreManagerView/ProductManagement/ProductManagement.vue';
export default {
  components: {
    ProductManagement
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

<style>
</style>