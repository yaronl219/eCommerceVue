<template>
  <div class="add-product-container">
    <form @submit.prevent="onSaveProduct" enctype="multipart/form-data">
      <label for="product-title">Product Title</label>
      <input id="product-title" v-model="item.title" type="text" />
      <label for="product-price">Product Price</label>
      <input id="product-price" v-model="item.basePrice" type="number" />
      <label for="product-image">Image URL</label>
      <input id="product-image" v-model="item.img" type="url" />
      <input
        type="file"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
      <label for="product-amountInStock">Amount in Stock</label>
      <input
        id="product-amountInStock"
        v-model="item.amountInStock"
        type="url"
      />
    </form>
    <extra-features-cmp
      :extras="item.features"
      @add-feature="addFeature"
      :includePrice="false"
    />
    <extra-features-cmp
      :extras="item.extras"
      @add-feature="addExtra"
      :includePrice="true"
    />
    <button @click="onSaveProduct">Save Product</button>
  </div>
</template>

<script>
import ExtraFeaturesCmp from "../../components/StoreManagerView/ExtraFeaturesCmp/ExtraFeaturesCmp.vue";
import { itemService } from "../../services/itemService";
export default {
  components: { ExtraFeaturesCmp },
  data() {
    return {
      item: {
        title: "",
        amountInStock: 0,
        img: "",
        basePrice: 0,
        features: [],
        extras: [],
      },
      file: ''
    };
  },
  computed: {
    isUpdating() {
      const { id } = this.$route.params;
      return !!id;
    },
  },
  async created() {
    const { id } = this.$route.params;
    if (id) {
      try {
        const item = await itemService.getItem(this.$route.params.id);
        if (!item) return;
        this.item = item;
      } catch (err) {
        console.log(err, "error fetching item. reverting to adding new item");
      }
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
      if (this.isUpdating) {
        this.item._id = this.$route.params.id;
        await this.$store.dispatch({ type: "updateItem", item: this.item });
      } else {
        await this.$store.dispatch({ type: "addItem", item: this.item });
      }
      this.onExitAddItem();
    },
    async handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData()
      formData.append('file', this.file);
      const fileUrl = await itemService.uploadImg(formData)
      this.item.img = fileUrl
    },
    onExitAddItem() {
      this.$router.push("/admin");
    },
  },
};
</script>

<style>
</style>