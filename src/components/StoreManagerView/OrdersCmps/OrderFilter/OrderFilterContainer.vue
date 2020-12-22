<template>
  <div class="order-filter-container">
    <order-filter
      v-for="(filter, index) of filters"
      :key="index"
      :filter="filter"
      :index="index"
      :isLast="index + 1 === filters.length"
      :canRemove="filters.length > 1"
      @update-filter="updateFilter"
      @add-filter="addFilter"
      @remove-filter="removeFilter"
    />
  </div>
</template>

<script>
import OrderFilter from "./OrderFilter.vue";
export default {
  components: { OrderFilter },
  data() {
    return {
      filters: [{}],
    };
  },
  created() {
      this.$store.dispatch({ type: "loadItems" });
  },
  methods: {
      addFilter() {
          this.filters.push({})
      },
      removeFilter(index) {
          if (this.filters.length <= 1) return
          this.filters.splice(index,1)
          this.sendFilter()
      },
      updateFilter(index,value) {
          this.filters[index] = value
          this.sendFilter()
      },
      sendFilter() {
          this.$emit('update-filter',this.filters)
      }
  },
};
</script>

<style>
</style>