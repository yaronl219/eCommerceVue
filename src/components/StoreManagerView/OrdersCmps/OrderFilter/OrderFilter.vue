<template>
<div>
    <h4>Filter Orders</h4>
  <div class="filters-container" v-if="$store.getters.itemsToDisplay">
    
    <div class="icon-container">
      <v-icon v-if="canRemove" @click="onRemoveFilter"> mdi-close </v-icon>
    </div>
    <v-select
      v-model="selectedFilterType"
      :items="filterTypeOptions"
      @change="onChangeFilterType"
      item-text="text"
      item-value="type"
    >
    </v-select>
    <v-text-field
      v-if="pickerType === 'text'"
      v-model="filterValue"
      @input="onChangeFilterText"
    />
    <v-text-field
      v-if="pickerType === 'number'"
      type="number"
      v-model="filterValue"
      @input="onChangeFilterText"
    />

    <order-date-picker v-if="pickerType === 'date'" @change-date="onSetValue" />
    <div class="item-picker" v-if="pickerType === 'item'">
      <text-filter :shouldOnlyEmit="true" @selected-item="onSetValue" />
    </div>
    <v-select
      v-if="pickerType === 'paymentType'"
      v-model="filterValue"
      :items="paymentTypes"
      item-text="text"
      item-value="type"
      @change="onChangeFilterText"
    />
    <div class="icon-container">
      <div v-if="isLast" @click="onAddFilter">
        <v-icon> mdi-plus </v-icon>
      </div>
      <div v-if="!isLast">AND</div>
    </div>
  </div>
</div>
</template>

<script>
import TextFilter from "../../ProductManagement/TextFilter.vue";
import OrderDatePicker from "./OrderDatePicker.vue";

export default {
  props: ["filter", "index", "isLast", "canRemove"],
  components: { OrderDatePicker, TextFilter },
  data() {
    return {
      selectedFilterType: "phone",
      filterValue: "",
      pickerType: "text",
      filterTypeOptions: [
        { type: "gt", text: "Total price greater than" },
        { type: "lt", text: "Total price less than" },
        { type: "city", text: "Shipping address city is" },
        { type: "street", text: "Shipping address street is" },
        { type: "house", text: "Shipping address house number is" },
        { type: "name", text: "Customer name is" },
        { type: "phone", text: "Customer phone number is" },
        { type: "email", text: "Customer email is" },
        { type: "createdafter", text: "Order placed after" },
        { type: "createdbefore", text: "Order placed before" },
        { type: "itemid", text: "Order contains item" },
        { type: "paymenttype", text: "Payment Type is" },
      ],
      paymentTypes: [
        { type: "CC", text: "Credit Card" },
        { type: "Cash", text: "Cash" },
      ],
    };
  },
  watch: {
    pickerType: function () {},
  },
  methods: {
    onChangeFilterType() {
      this.filterValue = "";
      let pickerType;
      switch (this.selectedFilterType) {
        case "lt":
          pickerType = "number";
          break;
        case "gt":
          pickerType = "number";
          break;
        case "createdafter":
          pickerType = "date";
          break;
        case "createdbefore":
          pickerType = "date";
          break;
        case "paymenttype":
          pickerType = "paymentType";
          break;
        case "itemid":
          pickerType = "item";
          break;
        default:
          pickerType = "text";
      }
      this.pickerType = pickerType;
    },
    onChangeFilterText() {
      let value = this.filterValue;
      if (
        this.selectedFilterType === "gt" ||
        this.selectedFilterType === "lt"
      ) {
        value = Number(this.filterValue);
      }
      this.$emit("update-filter", this.index, {
        [this.selectedFilterType]: value,
      });
    },
    onRemoveFilter() {
      this.$emit("remove-filter", this.index);
    },
    onAddFilter() {
      this.$emit("add-filter");
    },
    onSetValue(value) {
      this.filterValue = value;
      this.onChangeFilterText();
    },
  },
};
</script>

<style lang="scss" scoped>
  h4 {
      padding: 0 1rem;
  }

.filters-container {
  display: grid;
  grid-template-columns: 2rem 1fr 2fr 2rem;
  gap: 1rem;

  .icon-container {
    display: flex;
    align-items: center;
  }

  .item-picker {
    margin-top: -0.5rem;
  }


}
</style>