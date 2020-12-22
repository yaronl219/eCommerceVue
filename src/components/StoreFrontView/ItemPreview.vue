<template>
  <v-card @click="onClickItem">
    <div class="img-container">
      <product-image :imgUrl="item.img" />
      <on-sale-ribbon v-if="item.onSale"/>
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
import OnSaleRibbon from "./GlobalCmps/OnSaleRibbon.vue";

export default {
  components: { ProductImage, PriceContainer, OnSaleRibbon },
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
  position: relative;
}

.top {
  display: flex;
  .title {
    flex-grow: 1;
  }
}
</style>
