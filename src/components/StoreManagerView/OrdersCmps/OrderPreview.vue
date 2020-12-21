<template>
  <div class="order-preview-container">
      <div class="phone">
          <v-icon>
              mdi-phone
          </v-icon>
          {{order.contactDetails.phoneNumber}}
      </div>
      <div class="name">
          <v-icon>
              mdi-account-outline
          </v-icon>
          {{order.contactDetails.contactName}}
      </div>
      <div class="price">
          <v-icon>
              mdi-currency-usd
          </v-icon>
          ${{order.totalPrice}}
      </div>
            <div class="price">
          <v-icon>
              mdi-clock-outline
          </v-icon>
          {{createdAt}}
      </div>
  </div>
</template>

<script>
import { utilService } from '../../../services/utilService';
export default {
  props: ["order"],
  computed: {
      createdAt() {
          return utilService.parseTimestamp(this.order.createdAt)
      }
  }
};
</script>

<style scoped>
.order-preview-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>