<template>
  <div class="product-management-preview">
      <div class="product-img-container">
          <product-image :imgUrl="item.img"/>
      </div>
      <div class="product-details">
          <div class="product-title">
              <h4>{{item.title}}</h4>
          </div>
          <div class="product-stock">
              <small>In stock: {{item.amountInStock}}</small>
          </div>
      </div>
      <div class="product-actions">
      </div>
  </div>
</template>

<script>
import ProductImage from '../../GlobalCmps/ProductImage.vue';
export default {
  components: { ProductImage },
    props: ['item']
};
</script>

<style>
</style>