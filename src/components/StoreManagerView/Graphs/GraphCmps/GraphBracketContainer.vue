<template>
  <v-card>
    <div class="slot-container">
      <v-card-title>
        {{ title }}
      </v-card-title>
      <slot></slot>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.slot-container {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>