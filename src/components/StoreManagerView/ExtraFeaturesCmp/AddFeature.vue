<template>
  <div class="extra-feature-container">
    <form @submit.prevent="submit">
      <div class="input-container">
        <div class="title">
          <v-text-field
            required
            :rules="validationRules"
            label="Feautre Title"
            type="text"
            v-model="title"
          />
        </div>
        <div v-if="includePrice" class="price">
          <v-text-field
            required
            label="Feature Price"
            type="number"
            v-model="price"
          />
        </div>
      </div>
      <div class="action-container">
        <v-btn elevation="2" @click="submit" color="primary">Add Feature</v-btn>
        
      </div>
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
      validationRules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    submit() {
      if (!this.title) return;
      if (this.price < 0) return;
      const feature = {
        id: utilService.makeId(),
        title: this.title,
        price: +this.price,
      };
      this.$emit("add-feature", feature);
      this.title = "";
      this.price = 0;
    },

  },
};
</script>

<style lang="scss" scoped>
.has-error {
  background-color: salmon;
}

form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .input-container {
    display: flex;
    flex-grow: 1;
    gap: 0.5rem;
    > * {
      flex-grow: 1;
    }
  }
}
</style>