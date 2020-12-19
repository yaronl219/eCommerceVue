<template>
  <div>
    <v-form ref="form">
      <v-text-field
        label="Credit Card Number"
        required
        :rules="ccValidationRules"
        @input="onValidation"
        v-model="ccNumber"
      ></v-text-field>
      <div class="exp-date-container">
        <v-text-field
          label="MM"
          required
          @input="onValidation"
          :rules="expDateRules"
          v-model="expMonth"
        ></v-text-field>
        <v-text-field
          label="YY"
          required
          @input="onValidation"
          :rules="expDateRules"
          v-model="expYear"
        ></v-text-field>
      </div>
      <v-text-field
        label="CVV"
        @input="onValidation"
        :rules="cvvValidateRules"
        required
        v-model="cvv"
      >
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
const valid = require("card-validator");

export default {
  data() {
    return {
      ccNumber: "",
      expMonth: "",
      expYear: "",
      expDateRules: [this.checkExpDate],
      cvv: "",
      ccValidationRules: [
        (v) => !!v || "Please enter a Credit Card number",
        this.checkCCNumber,
      ],
      cvvValidateRules: [
        (v) => !!v || "Please enter your CVV",
        (v) =>
          v.length === this.cvvLength ||
          `CVV length should be ${this.cvvLength} numbers long`,
      ],
      cvvLength: 3,
    };
  },
  methods: {
    onValidation() {
      let validation = this.$refs.form.validate();
      if (!validation) return;
      let PaymentDetails = {
        ccNumber: this.ccNumber,
        expMonth: this.expMonth,
        expYear: this.expYear,
        cvv: this.cvv,
      };
      this.$emit("payment-details", PaymentDetails);
    },
    checkCCNumber() {
      let validCCNumber = valid.number(this.ccNumber);
      if (!validCCNumber.isValid)
        return "Please enter a valid Credit Card number";
      this.cvvLength = validCCNumber.card.code.size;
      return true;
    },
    checkExpDate() {
      if (!this.expMonth || !this.expYear)
        return "Please fill the expiration date";
      const month = +this.expMonth;
      const year = 2000 + +this.expYear;
      const expDate = new Date(`${year}-${month}`);
      const nowDate = new Date();
      if (expDate > nowDate) return true;
      return "Please enter a valid expiration date";
    },
  },
};
</script>

<style>
</style>