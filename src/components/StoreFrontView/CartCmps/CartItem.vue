<template>
  <div class="cart-item-container">
    <div class="left">
      <product-image :imgUrl="cartItem.img" />
    </div>
    <div class="right">
      <div class="top">
        <div class="title">
          {{ cartItem.title }}
        </div>
        <div class="price"><price-container :price="cartItem.price" /></div>
      </div>
      <div class="center">
        <ul>
          <li v-for="extra in cartItem.extras" :key="extra.id">
            <div class="extra">
              {{ extra.title }}
              <price-container :price="extra.price" />
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="amount-container">
          <amount-modifier
            :amount="cartItem.amount"
            @change-amount="onChangeAmount"
          />
        </div>
        <v-btn elevation="2" block width="32px" @click="onClickEdit">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-btn elevation="2" block width="32px" @click="onClickRemove">
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import PriceContainer from '../../GlobalCmps/PriceContainer.vue';
import ProductImage from "../../GlobalCmps/ProductImage.vue";
import AmountModifier from "../AmountModifier.vue";

export default {
  components: { ProductImage, AmountModifier, PriceContainer },
  props: ["cartItem"],
  methods: {
    onChangeAmount(amount) {
      this.$store.dispatch({
        type: "changeItemAmount",
        itemId: this.cartItem.cartId,
        amount,
      });
    },
    onClickRemove() {
        this.$store.dispatch({type:'removeItemFromCart', itemId:this.cartItem.cartId})
    },
    onClickEdit() {
        this.$router.push(`/store/${this.cartItem.id}?edit=${this.cartItem.cartId}`)
    }
  },
};
</script>

<style lang="scss" scoped>
.cart-item-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0.5rem;
}

.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.bottom {
  display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    gap: 0.5rem;
}
</style>