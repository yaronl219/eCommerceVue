<template>
  <v-card @click="onClickItem">
    <div class="img-container">
      <product-image :imgUrl="item.img" />
    </div>
    <div class="top">
      <div class="title">
        <v-card-title>{{ item.title }}</v-card-title>
      </div>
      <v-card-title>${{ item.basePrice }}</v-card-title>
    </div>
    <div class="bottom">
        <v-card-text>
            {{item.description}}
        </v-card-text>
    </div>
  </v-card>
</template>

<script>
import ProductImage from "../GlobalCmps/ProductImage.vue";

export default {
  components: { ProductImage },
  props: ["item"],
  methods: {
      onClickItem() {
          this.$router.push(`/store/${this.item._id}`)
      }
  },
  data() {
      return {

      }
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
