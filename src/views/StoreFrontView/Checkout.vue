<template>
  <v-main>
    <div class="checkout-screen-container">
      <div class="go-back-container">
        <v-btn x-small @click="onGoBack">
          <v-icon> mdi-chevron-left </v-icon>
          Back To Catalog
        </v-btn>
      </div>
      <div class="layout-container">
        <div class="left">
          <contact-details />
          <shipping-details />
          <payment-details />
          <div class="checkout-btn-container">
            <v-btn
              color="success"
              :disabled="!isOrderValid"
              @click="onCompleteCheckout"
            >
              <div v-if="isOrderValid">
                Complete Checkout
                <price-container :price="$store.getters.totalSum" />
              </div>
              <div v-if="!isOrderValid">Please fill all forms</div>
            </v-btn>
          </div>
        </div>
        <div class="right">
          <v-card>
            <cart-container />
          </v-card>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import PriceContainer from "../../components/GlobalCmps/PriceContainer.vue";
import CartContainer from "../../components/StoreFrontView/CartCmps/CartContainer.vue";
import ContactDetails from "../../components/StoreFrontView/CheckoutCmps/ContactDetails.vue";
import PaymentDetails from "../../components/StoreFrontView/CheckoutCmps/PaymentDetails.vue";
import ShippingDetails from "../../components/StoreFrontView/CheckoutCmps/ShippingDetails.vue";

export default {
  components: {
    ContactDetails,
    PaymentDetails,
    CartContainer,
    ShippingDetails,
    PriceContainer,
  },
  computed: {
    isOrderValid() {
      return (
        !!this.$store.getters.contactDetails &&
        !!this.$store.getters.paymentDetails &&
        !!this.$store.getters.totalSum &&
        !!this.$store.getters.shippingDetails
      );
    },
  },
  methods: {
    onCompleteCheckout() {
      const order = {
        items: [...this.$store.getters.itemsInCart],
        contactDetails: this.$store.getters.contactDetails,
        paymentDetails: this.$store.getters.paymentDetails,
        shippingDetails: this.$store.getters.shippingDetails,
      };

      this.$store.dispatch({ type: "toggleCartOpen" });
      this.$store.dispatch({ type: "sendOrder", order });
      this.$router.push("/complete");
    },
    onGoBack() {
      this.$router.push('/store')
    }
  },
};
</script>

<style lang="scss" scoped>
.checkout-screen-container {
  padding: 1.5rem 1.5rem 5rem;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
}

.go-back-container {
  padding-bottom: 0.5rem;
}

.layout-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  gap: 2rem;
}
.left {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: fit-content;
  gap: 1rem;
}

.right {
  position: relative;
}

.checkout-btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: white;
}
@media screen and (max-width: 623px) {
  .checkout-btn-container {
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 3;
  }
}
</style>