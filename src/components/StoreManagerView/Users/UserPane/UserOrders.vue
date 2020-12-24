<template>
  <div class="user-orders-container">
    <v-card-title> User Orders </v-card-title>
    <v-expansion-panels>
      <v-expansion-panel v-for="order of orders" :key="order._id">
        <v-expansion-panel-header>
          <order-preview :noPersonalDetails="true" :order="order" />
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <order-details :order="order" :removeContactDetails="true" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import OrderDetails from "../../OrdersCmps/OrderDetails.vue";
import OrderPreview from "../../OrdersCmps/OrderPreview.vue";
export default {
  props: ["orders"],
  components: { OrderPreview, OrderDetails },
};
</script>


        <style>
</style>