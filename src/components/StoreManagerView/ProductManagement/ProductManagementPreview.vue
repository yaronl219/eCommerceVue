<template>
  <v-card class="product-management-preview">
    <delete-item-dialog
      :isOpen="isDeleteItemModalOpen"
      :isItem="true"
      @close-dialog="isDeleteItemModalOpen = false"
      @delete-item="onDeleteItem"
    ></delete-item-dialog>
    <div class="container">
      <div class="product-img-container">
        <product-image :imgUrl="item.img" />
      </div>
      <div class="product-details">
        <div class="product-title">
          <h4>{{ item.title }}</h4>
        </div>
        <div class="product-stock">
          <small>In stock: {{ item.amountInStock }}</small>
        </div>
      </div>
      <div class="product-actions">
        <v-btn x-small elevation="2" fab @click="onClickEdit">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn x-small elevation="2" fab @click="onClickDeleteItem">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import ProductImage from "../../GlobalCmps/ProductImage.vue";
import DeleteItemDialog from "./DeleteItemDialog.vue";
export default {
  components: { ProductImage, DeleteItemDialog },
  props: ["item"],
  data() {
    return {
      isDeleteItemModalOpen: false,
    };
  },
  methods: {
    onClickEdit() {
      this.$router.push(`/add?editid=${this.item._id}`);
    },
    onClickDeleteItem() {
      this.isDeleteItemModalOpen = true;
    },
    async onDeleteItem() {
      await this.$store.dispatch({ type: "removeItem", itemId: this.item._id });
      this.isDeleteItemModalOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 6rem 1fr 5rem;
  grid-template-rows: 4rem;
  gap: 0.5rem;
  padding: 0.5rem;
}

.product-actions {
  display: flex;
  justify-content: space-around;
}

@media screen and (max-width: 600px) {
  .product-stock {
    display: none;
  }
}
</style>