<template>
  <v-main>
    <div class="add-product-container">
      <delete-item-dialog
        :isOpen="isDeleteItemModalOpen"
        @close-dialog="isDeleteItemModalOpen = false"
        @delete-item="onDeleteItem"
      />
      <form @submit.prevent="onSaveProduct" enctype="multipart/form-data">
        <v-card class="left">
          <v-card-title>Product Details</v-card-title>
          <v-text-field
            label="Product Title"
            id="product-title"
            v-model="item.title"
            type="text"
            required
          />
          <v-textarea
            id="product-description"
            label="Product Descrition"
            v-model="item.description"
          />
          <div class="numbers-container">
            <v-text-field
              id="product-price"
              label="Product Price"
              v-model="item.basePrice"
              type="number"
            />
            <v-text-field
              label="Amount in Stock"
              id="product-amountInStock"
              v-model="item.amountInStock"
              type="url"
            />
          </div>

          <div>
            <v-checkbox
              id="is-on-sale"
              label="Mark as on sale"
              v-model="item.onSale"
            />
          </div>
        </v-card>
        <v-card class="right">
          <v-card-title>Product Image</v-card-title>
          <div v-if="isUploading">
            <v-skeleton-loader type="card, article"></v-skeleton-loader>
          </div>
          <div v-if="!isUploading" class="img-form">
            <div class="img-container">
              <product-image :imgUrl="item.img" />
            </div>

            <!-- <label for="product-image">Enter an Image URL</label> -->
            <!-- <input id="product-image" v-model="item.img" type="url" /> -->
            <v-text-field
              label="Image Url"
              placeholder="Enter an image URL"
              v-model="item.img"
            />
            <label for="file">Or upload a file</label>
            <input
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
            />
          </div>
        </v-card>
      </form>
      <div class="extras-container">
        <extra-features-cmp
          :extras="item.features"
          @add-feature="addFeature"
          @delete-feature="onDeleteFeature"
          :includePrice="false"
          title="Included Features"
        />
        <extra-features-cmp
          title="Paid Extras"
          :extras="item.extras"
          @delete-feature="onDeleteExtra"
          @add-feature="addExtra"
          :includePrice="true"
        />
      </div>
      <div class="action-btns">
        <v-btn color="success" elevation="2" @click="onSaveProduct"
          >Save Product</v-btn
        >
        <v-btn
          v-if="isUpdating"
          elevation="2"
          @click="onOpenDeleteModal"
          color="error"
        >
          Delete Item
        </v-btn>
      </div>
    </div>
  </v-main>
</template>

<script>
import ProductImage from "../../components/GlobalCmps/ProductImage.vue";
import ExtraFeaturesCmp from "../../components/StoreManagerView/ExtraFeaturesCmp/ExtraFeaturesCmp.vue";
import DeleteItemDialog from "../../components/StoreManagerView/ProductManagement/DeleteItemDialog.vue";
import { itemService } from "../../services/itemService";
export default {
  components: { ExtraFeaturesCmp, ProductImage, DeleteItemDialog },
  data() {
    return {
      item: {
        title: "",
        amountInStock: 0,
        img: "",
        basePrice: 0,
        description: "",
        onSale: false,
        features: [],
        extras: [],
        parentCategory: null,
      },
      file: "",
      isUploading: false,
      isDeleteItemModalOpen: false,
    };
  },
  computed: {
    isUpdating() {
      const { editid } = this.$route.query;
      return !!editid;
    },
  },
  async created() {
    const { editid, categoryid } = this.$route.query;
    if (!editid && !categoryid) return this.$router.push("/admin/products");
    if (editid) {
      try {
        const item = await itemService.getItem(editid);
        if (!item) return;
        this.item = item;
      } catch (err) {
        console.log(err, "error fetching item. reverting to adding new item");
      }
    }
    if (categoryid) {
      this.item.parentCategory = categoryid;
    }
  },
  methods: {
    addFeature(feature) {
      this.item.features.push(feature);
    },
    addExtra(extra) {
      this.item.extras.push(extra);
    },
    async onSaveProduct() {
      if (!this.item.title) return;
      if (this.isUpdating) {
        this.item._id = this.$route.query.editid;
        await this.$store.dispatch({ type: "updateItem", item: this.item });
      } else {
        if (!this.item.parentCategory) return
          await this.$store.dispatch({ type: "addItem", item: this.item });
      }
      this.onExitAddItem();
    },
    async handleFileUpload() {
      this.isUploading = true;
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      const fileUrl = await itemService.uploadImg(formData);
      this.item.img = fileUrl;
      this.isUploading = false;
    },
    onExitAddItem() {
      this.$router.push("/admin/products");
    },
    onOpenDeleteModal() {
      this.isDeleteItemModalOpen = true;
    },
    onDeleteFeature(featureId) {
      
      
      this.item.features = this.item.features.filter(
        (feature) => feature.id !== featureId
      );
    },
    onDeleteExtra(featureId) {
      this.item.extras = this.item.extras.filter(
        (feature) => feature.id !== featureId
      );
    },
    async onDeleteItem() {
      const { id } = this.$route.params;
      if (id) {
        await this.$store.dispatch({ type: "removeItem", itemId: id });
      }
      this.isDeleteItemModalOpen = false;
      this.$router.push("/admin/products");
    },
  },
};
</script>

<style lang="scss" scoped>
.add-product-container {
  padding: 0.5rem;
}

form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.left {
  padding: 0.5rem;
  flex-direction: column;
  display: flex;
  .numbers-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
}

.right {
  padding: 0.5rem;
  flex-direction: column;
  display: flex;
  .img-container {
    height: 10rem;
    width: 100%;
  }
  .img-form {
    flex-direction: column;
    display: flex;
    // align-items: center;r
    // justify-items: center;
    // text-align: left;
    width: 100%;
    > label,
    > input {
      width: 100%;
    }
  }
}

.action-btns {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  > * {
    margin: 0 0.25rem;
  }
}
</style>