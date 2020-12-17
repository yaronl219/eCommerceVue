<template>
  <div class="extra-feature-container">
    <div class="title-container">
      <div v-if="!isEditingTitle" @click="onToggleEditTitle">{{ title }}</div>
      <div v-if="isEditingTitle">
        <input type="text" autofocus v-model="title" @blur="onToggleEditTitle" />
      </div>
    </div>
    <div v-if="includePrice" class="price-container">
      <div v-if="!isEditingPrice">${{ price }}</div>
      <div v-if="isEditingPrice">
        <input type="number" v-model="price" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
          this.isEditingTitle = !this.isEditingTitle
      },
      onToggleEditPrice() {
          this.isEditingPrice = !this.isEditingPrice
      }
  }
};
</script>

<style>
</style>