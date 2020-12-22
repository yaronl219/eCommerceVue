<template>
  <div class="order-preview-list-container">
    <v-card-title>Received Orders</v-card-title>
    <order-filter-container @update-filter="onUpdateQuery" />
    <div v-if="isLoading" class="loader">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-if="!isLoading" class="orders-preview-container">
      
      
      <v-expansion-panels>
        <v-expansion-panel v-for="order in orders" :key="order._id">
          <v-expansion-panel-header>
            <order-preview :order="order" />
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <order-details :order="order" />
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
import OrderDetails from "./OrderDetails.vue";
import OrderFilterContainer from './OrderFilter/OrderFilterContainer.vue';
import OrderPreview from "./OrderPreview.vue";
export default {
  components: {
    OrderPreview,
    OrderDetails,
    OrderFilterContainer,
  },
  data() {
    return {
      orders: null,
      isLoading: false,
      page: 1,
      length: 1,
      query: [],
    };
  },
  async created() {
    this.getOrders(this.page);
  },
  methods: {
    async getOrders(page) {
      this.isLoading = true;
      const res = await orderService.getOrders(page, this.query);
      this.orders = res.orders;
      this.length = Math.ceil(res.totalLength / 10);
      this.isLoading = false;
    },
    onSwitchPage(page) {
      this.getOrders(page);
    },
    onUpdateQuery(query) {
      this.query = query
      this.getOrders()
    }
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