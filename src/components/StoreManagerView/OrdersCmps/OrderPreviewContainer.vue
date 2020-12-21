<template>
  <div class="order-preview-list-container">
    <div v-if="isLoading" class="loader">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    
      <div v-if="!isLoading" class="orders-preview-container">
          <v-card-title>Received Orders</v-card-title>
        <v-expansion-panels>
          <v-expansion-panel v-for="order in orders" :key="order._id">
            <v-expansion-panel-header>
              <order-preview :order="order" />
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <order-details :order="order"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    
    <v-footer app>
      <div class="pagination-container">
        <v-pagination
          v-model="page"
          :length="length"
          @input="onSwitchPage"
          total-visible="7"
        ></v-pagination>
      </div>
    </v-footer>
  </div>
</template>

<script>
import { orderService } from "../../../services/orderService";
import OrderDetails from './OrderDetails.vue';
import OrderPreview from "./OrderPreview.vue";
export default {
  components: {
    OrderPreview,
    OrderDetails,
  },
  data() {
    return {
      orders: null,
      isLoading: false,
      page: 1,
      length: 1,
    };
  },
  async created() {
    this.getOrders(1);
  },
  methods: {
    async getOrders(page) {
      this.isLoading = true;
      const res = await orderService.getOrders(page);
      this.orders = res.orders;
      this.length = Math.ceil(res.totalLength / 10);
      this.isLoading = false;
    },
    onSwitchPage(page) {
      this.getOrders(page);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-preview-list-container {
    padding: 1rem;
}

.loader {
  display: flex;
  justify-content: center;
}
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>