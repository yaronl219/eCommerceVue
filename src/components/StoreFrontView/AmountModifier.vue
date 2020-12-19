<template>
  <div class="amount-modifier-container">
    <div class="decrease">
      <v-btn width="2rem" block @click="onDecrease">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </div>
<div class="amount-container">
    <v-card height="100%">
        <div class="amount">
    {{amount}}
        </div>
    </v-card>
</div>
    <div class="increase" >
      <v-btn width="2rem" block  @click="onIncrease">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["amount"],
  methods: {
      onIncrease() {
          const newAmount = this.amount + 1
          this.$emit('change-amount', newAmount)
      },
      onDecrease() {
          const newAmount = this.amount - 1
          this.$emit('change-amount', newAmount)
      }
  }
};
</script>

<style lang="scss" scoped>
.amount-modifier-container {
    display: grid;
    grid-template-columns: 2rem 2fr 2rem;
    gap: 0.125rem;
}
.amount-container {
    
    height: 100%;
    .amount {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>