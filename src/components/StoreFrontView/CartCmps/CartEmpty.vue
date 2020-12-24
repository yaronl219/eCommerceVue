<template>
  <div class="empty-cart-container">
      <div class="img-container">
          <img src="../../../assets/img/sad-bag.svg" />
      </div>
      <h4>Looks like your bag is empty</h4>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.empty-cart-container {
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center ;
}

.img-container {
    width: 3rem;
}
</style>