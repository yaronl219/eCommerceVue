<template>
  <div class="extra-feature-container">
    <form @submit.prevent="submit">
      <div class="title">
        <span>Feature Title</span>
        <input
          required
          v-bind:class="{ 'has-error': isTitleError }"
          
          type="text"
          v-model="title"
        />
      </div>
      <div v-if="includePrice" class="price">
        <span>Price</span>
        <input
          required
          v-bind:class="{ 'has-error': isPriceError }"
          
          type="number"
          v-model="price"
        />
      </div>
      <button @click="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { utilService } from "../../../services/utilService";

export default {
  props: ["includePrice"],
  data() {
    return {
      title: "",
      price: 0,
      isTitleError: false,
      isPriceError: false,
    };
  },
  methods: {
    submit() {
      if (!this.title) return (this.isTitleError = true);
      if (this.price < 0) return (this.isPriceError = true);
      const feature = {
        id: utilService.makeId(),
        title: this.title,
        price: +this.price,
      };
      this.$emit("add-feature", feature);
      this.isTitleError = false;
      this.title = "";
      this.isPriceError = false;
      this.price = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.has-error {
  background-color: salmon;
}
</style>