<template>
  <div class="extra-feature-container">
    <div class="title-container">
      <div v-if="!isEditingTitle" @click="onToggleEditTitle">{{ title }}</div>
      <div v-if="isEditingTitle">
        <input
          type="text"
          autofocus
          v-model="title"
          @blur="onToggleEditTitle"
        />
      </div>
    </div>
    <div v-if="includePrice" class="price-container">
      <div v-if="!isEditingPrice" @click="onToggleEditPrice"><price-container :price="price" /></div>
      <div v-if="isEditingPrice">
        <input
          type="number"
          autofocus
          v-model="price"
          @blur="onToggleEditPrice"
        />
      </div>
    </div>
    <v-btn x-small elevation="0" color="#F0F0F0" fab @click="onDeleteFeautre">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script>
import PriceContainer from '../../GlobalCmps/PriceContainer.vue';
export default {
  components: { PriceContainer },
  props: ["extra", "includePrice"],
  created() {
    this.title = this.extra.title;
    this.price = this.extra.price;
  },
  data() {
    return {
      isEditingTitle: false,
      isEditingPrice: false,
      title: "",
      price: "",
    };
  },
  methods: {
    onToggleEditTitle() {
      this.isEditingTitle = !this.isEditingTitle;
    },
    onToggleEditPrice() {
      this.isEditingPrice = !this.isEditingPrice;
    },
    onDeleteFeautre() {
        this.$emit('delete-feature',this.extra.id)
    }
  },
};
</script>

<style lang="scss" scoped>
.extra-feature-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f0f0f0;
  margin-bottom: 0.25rem;
  padding: 0.25rem 0.125rem;
  border-radius: 0.25rem;
}

.title-container {
  flex-grow: 1;
}
</style>