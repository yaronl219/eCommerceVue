<template>
  <div class="user-pane-container">
    <v-card-title> User Details </v-card-title>
    <div class="close-container" @click="onClose">
      <v-btn fab>
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </div>
    <div class="loader" v-if="isLoading">
      <v-progress-circular
        :size="48"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div class="user-details" v-if="!isLoading">
      <div>
        <v-icon> mdi-account </v-icon>
        {{ user.contactName }}
      </div>
      <div>
        <v-icon> mdi-phone </v-icon>
        {{ user.phoneNumber }}
      </div>
      <div>
        <v-icon> mdi-email-outline </v-icon>
        {{ user.email }}
      </div>
    </div>
    <user-orders :orders="orders" v-if="!isLoading" />
  </div>
</template>

<script>
import { orderService } from "../../../../services/orderService";

import UserOrders from "./UserOrders.vue";
export default {
  components: { UserOrders },
  props: ["userPhoneNumber"],
  data() {
    return {
      user: null,
      orders: null,
      isLoading: true,
    };
  },
  created() {
    this.getUserOrders();
  },
  watch: {
    userPhoneNumber: function () {
      this.getUserOrders();
    },
  },
  methods: {
    async getUserOrders() {
      this.isLoading = true;
      const res = await orderService.getOrders(
        1,
        [{ phone: this.userPhoneNumber }],
        50
      );
      // console.log(orders)
      this.user = res.orders[0].contactDetails;
      this.orders = res.orders;
      this.isLoading = false;
    },
    onClose() {
        this.user = null
        this.orders = null
        this.$router.push('/admin/users')
    }
  },
};
</script>

<style scoped>
.user-pane-container {
  padding: 1rem;
  position: relative;
}

.close-container {
    position: absolute;
    right: 1rem;
    top: 1rem;
}
</style>