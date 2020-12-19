<template>
  <v-main>
    <div class="checkout-screen-container">
      <div class="layout-container">
        <div class="left">
          <contact-details @contact-details="updateContactDetails" />
          <payment-details @payment-details="onReceivePayment" />
          <div class="checkout-btn-container">
            <v-btn
              color="success"
              :disabled="!isOrderValid"
              @click="onCompleteCheckout"
              >Complete Checkout ${{ $store.getters.totalSum }}</v-btn
            >
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
import CartContainer from "../../components/StoreFrontView/CartCmps/CartContainer.vue";
import ContactDetails from "../../components/StoreFrontView/CheckoutCmps/ContactDetails.vue";
import PaymentDetails from "../../components/StoreFrontView/CheckoutCmps/PaymentDetails.vue";

export default {
  components: {
    ContactDetails,
    PaymentDetails,
    CartContainer,
  },
  data() {
    return {
      order: {
        contactDetails: null,
        paymentDetails: null,
      },
    };
  },
  computed: {
    isOrderValid() {
      return (
        !!this.order.contactDetails &&
        !!this.order.paymentDetails &&
        !!this.$store.getters.totalSum
      );
    },
  },
  methods: {
    updateContactDetails(contactDetails) {
      this.order.contactDetails = contactDetails;
    },
    onReceivePayment(paymentOption) {
      console.log(paymentOption.type);
      if (paymentOption.type === "Cash") {
        this.order.paymentDetails = paymentOption;
      } else {
        if (
          paymentOption.ccNumber &&
          paymentOption.expMonth &&
          paymentOption.expYear &&
          paymentOption.cvv
        ) {
          this.order.paymentDetails = paymentOption;
        } else {
          this.order.paymentDetails = null;
        }
      }
    },
    onCompleteCheckout() {
      this.order.items = [...this.$store.getters.itemsInCart];
      this.$store.dispatch({ type: "sendOrder", order: this.order });
    },
  },
};
</script>

<style lang="scss" scoped>
.checkout-screen-container {
  padding: 1.5rem 1.5rem 5rem;
  display: flex;
  justify-content: center;
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