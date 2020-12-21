<template>
  <v-card>
    <v-card-title> Payment Details </v-card-title>
    <v-card-text>
      <div class="payment-toggle-container">
        <v-btn-toggle
          @change="onSwitchPaymentOption"
          v-model="paymentOption"
          mandatory
        >
          <v-btn>
            <v-icon>mdi-credit-card</v-icon>
            <span>Credit Card</span>
          </v-btn>
          <v-btn>
            <v-icon>mdi-cash</v-icon>
            <span>Cash</span>
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-card-text>
    <div class="payment-option-container">
      <v-window v-model="paymentOption">
        <v-window-item>
          <v-card-text>
            <credit-card-cmp @payment-details="onVerifiedPayment" />
          </v-card-text>
        </v-window-item>
        <v-window-item>
          <v-card-text> Pay with cash when the delivery arrives </v-card-text>
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</template>

<script>
import CreditCardCmp from "./CreditCardCmp.vue";
export default {
  components: { CreditCardCmp },
  data() {
    return {
      paymentOption: 0,
    };
  },
  computed: {
    isCreditCard() {
      return !this.paymentOption;
    },
  },

  methods: {
    onVerifiedPayment(creditCard) {
      if (this.isCreditCard) {
        const paymentOption = creditCard;
        paymentOption.type = "CC";
        this.onReceivePayment(paymentOption)
      }
    },
    onSwitchPaymentOption() {
      const paymentOption = {};
      if (this.isCreditCard) {
        paymentOption.type = "CC";
      } else {
        paymentOption.type = "Cash";
      }
      this.onReceivePayment(paymentOption)
    },
    onReceivePayment(paymentOption) {
      if (paymentOption.type === "Cash") {
        this.$store.dispatch({type:'setPaymentDetails', paymentDetails: paymentOption})
      } else {
        if (
          paymentOption.ccNumber &&
          paymentOption.expMonth &&
          paymentOption.expYear &&
          paymentOption.cvv
          
        ) {
            console.log('g')
          this.$store.dispatch({type:'setPaymentDetails', paymentDetails: paymentOption})
        } else {
          this.$store.dispatch({type:'setPaymentDetails', paymentDetails :null})
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.payment-toggle-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>