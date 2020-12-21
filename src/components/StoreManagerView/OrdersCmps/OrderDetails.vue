<template>
  <div class="order-details-container">
    <div class="general-details">
      <div class="contact-details">
        <h3>Personal Details</h3>
        <ul>
          <li>
            <strong>Customer Name: </strong
            >{{ order.contactDetails.contactName }}
          </li>
          <li>
            <strong>Customer Phone: </strong
            >{{ order.contactDetails.phoneNumber }}
          </li>
          <li>
            <strong>Customer E-mail: </strong>{{ order.contactDetails.email }}
          </li>
        </ul>
      </div>
      <div class="shipping-details">
        <h3>Shipping Details</h3>
        <ul>
          <li><strong>City: </strong>{{ order.shippingDetails.city }}</li>
          <li><strong>Street: </strong>{{ order.shippingDetails.street }}</li>
          <li>
            <strong>House number: </strong>{{ order.shippingDetails.houseNum }}
          </li>
        </ul>
      </div>
      <div class="payment-details">
        <h3>Payment Details</h3>
        <ul>
          <li>
            <strong>Payment Type: </strong>{{ order.paymentDetails.type }}
          </li>
          <li v-if="order.paymentDetails.type === 'CC'">
            <strong>Last 4 Digits: </strong
            >{{ order.paymentDetails.last4Digits }}
          </li>
          <li v-if="order.paymentDetails.type === 'CC'">
            <strong>Expiration Date: </strong>{{ order.paymentDetails.expDate }}
          </li>
        </ul>
      </div>
    </div>
    <order-item-details :order="order" />
  </div>
</template>

<script>
import OrderItemDetails from './OrderItemDetails.vue';
export default {
  components: { OrderItemDetails },
  props: ["order"],
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}

.general-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 2rem;
}
</style>