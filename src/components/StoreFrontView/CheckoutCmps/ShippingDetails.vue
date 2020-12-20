<template>
  <v-card>
    <v-card-title> Shipping Details </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          label="City"
          required
          @input="onValidation"
          v-model="city"
        ></v-text-field>
        <v-text-field
          label="Street"
          required
          @input="onValidation"
          v-model="street"
        ></v-text-field>
        <v-text-field
          label="House no."
          @input="onValidation"
          required
          type="number"
          v-model="houseNum"
        >
        </v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      street: "",
      houseNum: "",
    };
  },
  created() {
      const {shippingDetails} = this.$store.getters
      if (shippingDetails) {
          this.city = shippingDetails.city
          this.street = shippingDetails.street
          this.houseNum = shippingDetails.houseNum
      }
  },
  methods: {
    onValidation() {
      if (![this.city, this.street, this.houseNum].every((v) => v)) return;
      let validation = this.$refs.form.validate();
      if (!validation) return;
      let shippingDetails = {
        city: this.city,
        street: this.street,
        houseNum: this.houseNum,
      };
      this.$store.dispatch({ type: "setShippingDetails", shippingDetails });
      this.$emit("shipping-details", shippingDetails);
    },
  },
};
</script>

<style>
</style>