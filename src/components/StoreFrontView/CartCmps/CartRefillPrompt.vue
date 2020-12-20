<template>
  <v-dialog v-model="isOpen" persistent width="500" data-app>
      <div class="background">
    <v-card-title> Refill Cart? </v-card-title>
    <v-card-text v-if="orderCreationDate">Looks like you have an unfinished order from {{orderCreationDate.toLocaleString()}}</v-card-text>
    <v-card-actions>
        <v-btn @click="onForgetOrder">
            Forget Order
        </v-btn>
        <v-btn color="success" @click="onRefillCart">
            Refill Cart
        </v-btn>
    </v-card-actions>
      </div>
  </v-dialog>
</template>

<script>
import { cartService } from "../../../services/cartService";

export default {
  props: ["isOpen"],
  computed: {
    orderCreationDate() {
      const savedCart = cartService.getSavedCart();
      if (!savedCart) return
      return new Date(savedCart.createdAt);
    },
  },
  methods: {
      onForgetOrder() {
          this.$emit('forget-order')
      },
      onRefillCart() {
          this.$emit('refill-cart')
      }
  }
};
</script>

<style scoped>
.background {
    background-color: white;
}
</style>