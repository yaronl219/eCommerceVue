<template>
  <v-card @click="onClickItem">
    <div class="img-container">
      <product-image :imgUrl="item.img" />
    </div>
    <div class="top">
      <div class="title">
        <v-card-title>{{ item.title }}</v-card-title>
      </div>
      <v-card-title>
        <price-container :price="item.basePrice" />
      </v-card-title>
    </div>
    <div class="bottom">
      <v-card-text>
        {{ shortDescription }}
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import PriceContainer from "../GlobalCmps/PriceContainer.vue";
import ProductImage from "../GlobalCmps/ProductImage.vue";

export default {
  components: { ProductImage, PriceContainer },
  props: ["item"],
  computed: {
    shortDescription() {
      let { description } = this.item;
      if (description.length < 100) return description;
      return `${description.substring(0, 97)}...`;
    },
  },
  methods: {
    onClickItem() {
      this.$router.push(`/store/${this.item._id}`);
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.img-container {
  height: 15rem;
}

.top {
  display: flex;
  .title {
    flex-grow: 1;
  }
}
</style>
