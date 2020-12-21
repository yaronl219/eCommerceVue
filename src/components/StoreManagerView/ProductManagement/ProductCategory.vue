<template>
  <v-expansion-panel-content class="expansion-panel">
    <draggable :v-model="items" @end="(ev) => onMove(ev)">
      <product-management-preview
        v-for="item in items"
        :key="item._id"
        :item="item"
      />
    </draggable>
    <div class="add-item-container">
      <v-btn color="primary" @click="onClickAddItem">Add Product</v-btn>
    </div>
  </v-expansion-panel-content>
</template>

<script>
import ProductManagementPreview from "./ProductManagementPreview.vue";
import draggable from "vuedraggable";

export default {
  components: { ProductManagementPreview, draggable },
  props: ["category"],
  computed: {
      items() {
          return this.$store.getters.itemsByCategory(this.category._id)
      }
  },
  methods: {
    onMove(dragEvent) {
      const fromIndex = dragEvent.oldIndex;
      const futureIndex = dragEvent.newIndex;
      if (fromIndex === futureIndex) return;
      this.$store.dispatch({
        type: "changeItemOrder",
        fromIndex,
        futureIndex,
        categoryId: this.category._id,
      });
    //   this.sortDisplay();
    },
    // sortDisplay() {
    //   const sortedItems = this.$store.getters
    //     .itemsByCategory(this.category._id)
    //     .sort((a, b) => a.index - b.index);
    //   this.items = null;
    //   this.items = sortedItems;
    // },
    onClickAddItem() {
      this.$router.push(`/add?categoryid=${this.category._id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-item-container {
    display: flex;
    padding: 0.5rem;
    flex-direction: row-reverse;
}

.product-management-preview {
    margin-bottom: 0.25rem;
}

@media screen and (max-width:600px){
    .expansion-panel {
        // padding: -0.5rem;
    }
}
</style>