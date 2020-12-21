<template>
  <div class="category-container" ref="categoryRef">
    <v-card-title>
      {{ category.title }}
    </v-card-title>
    <div class="store-items-container">
      <item-preview v-for="item in items" :key="item._id" :item="item" />
    </div>
  </div>
</template>

<script>
import ItemPreview from "../ItemPreview.vue";

export default {
  components: { ItemPreview },
  props: ["category"],
  mounted: function () {
    this.$nextTick(function () {
      const yPos = this.$refs.categoryRef.offsetTop
      this.$store.dispatch({type:'setPosition', categoryId:this.category._id, yPos})
    });
  },
  computed: {
    items() {
      return this.$store.getters.itemsByCategory(this.category._id);
    },
  },
};
</script>

<style lang="scss" scoped>
.store-items-container {
  flex-grow: 1;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.25rem;
  transition: 0.2s;
}
</style>