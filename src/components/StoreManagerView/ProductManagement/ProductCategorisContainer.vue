<template>
  <div class="product-categories-container">
    <v-expansion-panels>
      <draggable v-if="categories" v-model="categories" @end="onMove" class="drag-container">
        <v-expansion-panel
          multiple
          v-for="category in categories"
          :key="category._id"
        >
          <v-expansion-panel-header>
            <category-header :category="category" />
          </v-expansion-panel-header>
          <product-category :category="category" />
        </v-expansion-panel>
      </draggable>
    </v-expansion-panels>
    <new-category v-if="isCategoryFormOpen" @add-category="onSaveCategory" />
    <div class="add-category-container">
      <v-btn color="primary" @click="onClickAddCategory">Add Category</v-btn>
    </div>
  </div>
</template>

<script>
import ProductCategory from "./ProductCategory.vue";
import draggable from "vuedraggable";
import NewCategory from "./NewCategory.vue";
import CategoryHeader from './CategoryHeader.vue';

export default {
  components: { ProductCategory, draggable, NewCategory, CategoryHeader },
  data() {
    return {
      isCategoryFormOpen: false,
      // categories: null,
    };
  },
  // created() {
  //   this.sortDisplay()
  // },
  computed: {
    categories() {
      return this.$store.getters.storeCategories
    }
  },
  methods: {
    onClickAddCategory() {
      this.isCategoryFormOpen = true;
    },
    async onSaveCategory(categoryTitle) {
      this.isCategoryFormOpen = false;
      await this.$store.dispatch({ type: "addCategory", categoryTitle });
    },
    onMove(dragEvent) {
      const fromIndex = dragEvent.oldIndex;
      const futureIndex = dragEvent.newIndex;
      if (fromIndex === futureIndex) return;
      this.$store.dispatch({
        type: "changeCategoryOrder",
        fromIndex,
        futureIndex,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-category-container {
  display: flex;
  padding: 0.5rem;
  flex-direction: row-reverse;
}

.drag-container {
  width: 100%;
}
</style>