<template>
  <v-main>
    <div class="order-complete-screen">
      <div v-if="!$store.getters.orderId">
        <v-card>
          <div class="pending-container">
            <v-card-title> We're sending your order </v-card-title>
            <v-card-text> Please wait for confirmation </v-card-text>
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-card>
      </div>
      <div v-if="$store.getters.orderId">
        <v-card>
          <div class="complete-container">
            <v-card-title>Your order has been received</v-card-title>
            <v-card-text>Thank you for ordering</v-card-text>
            <v-card-actions
              ><v-btn @click="onCompleteProcess"
                >Back to store</v-btn
              ></v-card-actions
            >
          </div>
        </v-card>
      </div>
    </div>
  </v-main>
</template>

<script>
export default {
  methods: {
    onCompleteProcess() {
      this.$store.dispatch({ type: "emptyCart" });
      this.$store.dispatch({ type: "resetDetails" });
      this.$router.push("/store");
    },
  },
};
</script>

<style lang="scss" scoped>
.order-complete-screen {
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pending-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}
</style>