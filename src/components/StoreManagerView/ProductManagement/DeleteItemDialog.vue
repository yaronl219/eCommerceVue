<template>
  <v-dialog v-model="isOpen" persistent width="500" data-app>
    <div class="delete-item-dialog-container">
      <h4>Delete item</h4>
      <p>Are you sure you want to delete this item?</p>
      <button @click="onDelete">Delete</button>
      <button @click="onClose">Cancel</button>
    </div>
      
  </v-dialog>
</template>

<script>
export default {
  props: ["isOpen"],
  data() {
      return {
        //   on: true
      }
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

<style>
.v-dialog__container {
    display: unset !important; 
}
</style>