<template>
  <v-card>
    <div
      class="user-preview-container"
      @click="onSelectUser"
      v-bind:class="{ 'selected-user': isSelected }"
    >
      <div>
        <v-icon> mdi-phone </v-icon>
        {{ user._id.phone }}
      </div>
      <div>
        <v-icon> mdi-account </v-icon>
        {{ user._id.name }}
      </div>
      <div class="total-spending-container">
        <v-icon> mdi-currency-usd </v-icon>
        Total Spending:
        <price-container :price="user.total" />
      </div>
    </div>
  </v-card>
</template>

<script>
import PriceContainer from "../../GlobalCmps/PriceContainer.vue";

export default {
  props: ["user", "isSelected"],
  components: { PriceContainer },
  methods: {
    onSelectUser() {
      this.$emit("select-user", this.user._id.phone);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-preview-container {
  padding: 1rem;
  margin: 0.125rem 0;
  display: grid;
  grid-template-columns: 10rem repeat(auto-fit, minmax(200px, 1fr));
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
}

.selected-user {
  background-color: #ccc;
}

@media screen and (max-width: 750px) {
    .total-spending-container {
        display: none;
    }
}
</style>