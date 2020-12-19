<template>
  <li>
    <div @click="onCheck" class="extra-feature-container">
      <div class="checkbox-container">
        <v-checkbox dense v-if="isEditable" v-model="isChecked" />
      </div>
      <div class="product-title">
        {{ extra.title }}
      </div>
      <div v-if="extra.price">${{ extra.price }}</div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["isEditable", "extra", "addedExtras"],
  data() {
    return {
      isChecked: false,
    };
  },
  created() {
    this.calculateIfChecked();
  },
  watch: {
    addedExtras: function () {
      this.calculateIfChecked()
    }
  },
  methods: {
    calculateIfChecked() {
      if (!this.addedExtras) return;
      let isFound = this.addedExtras.find(
        (extra) => extra.id === this.extra.id
      );
      this.isChecked = !!isFound;
    },
    onCheck() {
      this.$emit("check-feature", this.extra);
    },
  },
};
</script>

<style lang="scss" scoped>
.extra-feature-container {
  display: flex;
  align-items: center;
  height: 3.75rem;
}
.product-title {
  flex-grow: 1;
}

.checkbox-container {
  width: 1.75rem;
}
</style>