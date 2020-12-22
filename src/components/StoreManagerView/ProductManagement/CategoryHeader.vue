<template>
  <div class="category-header-container">
    <delete-item-dialog
      :isItem="false"
      :isOpen="isDeleteModalOpen"
      @close-dialog="isDeleteModalOpen = false"
      @delete-item="onDeleteCategory"
    />
    <div v-if="!isEditing" class="header-container">
      <div class="title-container">
        {{ categoryName }}
      </div>
      <div @click.stop="onClickVisibilty">
        <v-icon v-if="category.isVisible"> mdi-eye </v-icon>
        <v-icon v-if="!category.isVisible"> mdi-eye-off </v-icon>
      </div>
      <v-icon @click.stop="onClickEdit"> mdi-pencil </v-icon>
      <v-icon @click.stop="onClickDelete"> mdi-delete </v-icon>
    </div>
    <div v-if="isEditing">
      <v-form @submit.prevent="onSaveName" @click.stop>
        <v-text-field
          v-model="categoryName"
          required
          :rules="rules"
          autofocus
          @blur="onSaveName"
        >
        </v-text-field>
      </v-form>
    </div>
  </div>
</template>

<script>
import DeleteItemDialog from "./DeleteItemDialog.vue";
export default {
  components: { DeleteItemDialog },
  props: ["category"],
  created() {
    this.categoryName = this.category.title;
  },
  data() {
    return {
      isEditing: false,
      isDeleteModalOpen: false,
      categoryName: "",
      rules: [(v) => !!v || "Field cannot be empty"],
    };
  },
  methods: {
    onClickEdit() {
      this.isEditing = true;
    },
    onClickDelete() {
      this.isDeleteModalOpen = true;
    },
    onClickVisibilty() {
      this.$store.dispatch({type:'toggleVisibilty',categoryId:this.category._id})
    },
    onDeleteCategory() {
      this.$store.dispatch({
        type: "removeCategory",
        categoryId: this.category._id,
      });
      this.isDeleteModalOpen = false;
    },
    onSaveName() {
      this.isEditing = false;
      this.$store.dispatch("renameCategory", {
        categoryName: this.categoryName,
        categoryId: this.category._id,
      });
    },
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
}
.title-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
}
</style>