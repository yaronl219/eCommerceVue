<template>
  <div class="order-preview-container">
      <div class="phone" v-if="!noPersonalDetails">
          <v-icon>
              mdi-phone
          </v-icon>
          {{order.contactDetails.phoneNumber}}
      </div>
      <div class="name" v-if="!noPersonalDetails">
          <v-icon>
              mdi-account-outline
          </v-icon>
          {{order.contactDetails.contactName}}
      </div>
      <div class="price">
          <v-icon>
              mdi-currency-usd
          </v-icon>
          <price-container :price="order.totalPrice" />
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
import PriceContainer from '../../GlobalCmps/PriceContainer.vue';
export default {
  props: ["order", 'noPersonalDetails'],
  components: {PriceContainer},
  computed: {
     
     createdAt() {
          return utilService.parseTimestamp(this.order.createdAt)
      }
  }
};
</script>

<style scoped>
.order-preview-container {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(10rem, 1fr));
}
</style>