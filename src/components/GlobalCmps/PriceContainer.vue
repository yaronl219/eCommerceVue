<template>
<span>
      {{displayPrice}}
</span>
</template>

<script>
export default {
  props: ["price"],
  computed: {
      displayPrice() {
          return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits:2 }).format(this.price)
      }
  }
};
</script>

<style>
</style>