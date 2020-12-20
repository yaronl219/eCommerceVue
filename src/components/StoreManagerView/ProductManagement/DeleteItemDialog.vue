<template>
  <v-dialog v-model="isOpen" persistent width="500" data-app>
    <div class="delete-item-dialog-container">
      <div v-if="isItem">
        <v-card-title>Delete item</v-card-title>
        <v-card-text>
        <p>Are you sure you want to delete this item?</p>
        </v-card-text>
      </div>
      <div v-if="!isItem">
          <v-card-title>Delete Category</v-card-title>
          <v-card-text>
          <p>Are you sure you want to delete this category and all it's contents?</p>
          </v-card-text>
      </div>
      <v-card-text>
      <p>This process is irreversible!</p>
      </v-card-text>

      <v-btn @click="onDelete" color="error">Delete</v-btn>
      <v-btn @click="onClose">Cancel</v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ["isOpen", "isItem"],
  data() {
    return {
      //   on: true
    };
  },
  methods: {
    onDelete() {
      this.$emit("delete-item");
    },
    onClose() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style scoped>
.v-dialog__container {
  display: unset !important;
}
button {
    margin-left: 1rem;
}
.delete-item-dialog-container {
    background-color: white;
    padding: 1rem;
}
</style>