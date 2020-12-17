<template>
  <div class="product-image-container">
    <div v-if="!img" class="img-placholer"></div>
    <div v-if="img" class="product-img">
      <img :src="img.src" alt="product" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["imgUrl"],
  created() {
      this.loadImage()
  },
  methods: {
    loadImage() {
      const productImage = new Image();
      productImage.src = this.imgUrl
      productImage.onload = (ev) => {
          console.log(ev)
          this.img = productImage
      }
    },
  },
  data() {
    return {
      img: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.product-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  div {
    flex-grow: 1;
  }
}

.img-placholer {
  background-image: url("../../assets/img/image-placeholder.png");
  background-size: cover;
  background-position: center;
}


</style>