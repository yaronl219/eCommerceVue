<template>
  <div class="product-image-container">
    <div v-if="!img" class="img-placholer"></div>
    <div
      v-if="img"
      class="product-img"
      v-bind:style="{ backgroundImage: 'url(' + img.src + ')' }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["imgUrl"],
  watch: {
    imgUrl: function (newVal, oldVal) {
      if (newVal !== oldVal) this.loadImage()
    },
  },
  created() {
    this.loadImage();
  },
  methods: {
    loadImage() {
      const productImage = new Image();
      productImage.src = this.imgUrl;
      productImage.onload = () => {
        this.img = productImage;
      };
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
  overflow: hidden;
  div {
    flex-grow: 1;
    background-size: cover;
    background-position: center;
  }
}

.img-placholer {
  background-image: url("../../assets/img/image-placeholder.png");
}
</style>