<template>
  <div class="product-management-view-container management-main-view">
    <text-filter @filter-by="onFilterBy" />
    <div class="items-container">
      <product-management-preview
        v-for="item in itemsToDisplay"
        :key="item._id"
        :item="item"
      />
    </div>
    <div class="add-item-container">
      <v-btn color="primary" @click="onClickAddItem">Add Product</v-btn>
    </div>
  </div>
</template>

<script>
import ProductManagementPreview from "./ProductManagementPreview.vue";
import TextFilter from "../../GlobalCmps/TextFilter";

export default {
  components: { ProductManagementPreview, TextFilter },
  computed: {
    itemsToDisplay() {
      return this.$store.getters.itemsToDisplay;
    },
  },
  methods: {
    onFilterBy(filterBy) {
      console.log(filterBy);
      this.$store.dispatch({ type: "filterItems", filterBy });
    },
    onClickAddItem() {
      this.$router.push("/add");
    },
  },
};
</script>

<style lang="scss" scoped>
.items-container {
  padding: 0.5rem;
}

.add-item-container {
    display: flex;
    padding: 0.5rem;
    flex-direction: row-reverse;
}
</style>