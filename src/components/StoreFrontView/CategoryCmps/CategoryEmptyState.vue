<template>
  <div class="empty-state-category-container">
    <div class="empty-header">
      <v-skeleton-loader type="heading" />
    </div>
    <div class="cards-container">
      <v-skeleton-loader
        
        max-width="300"
        type="card"
        v-for="i in 12"
        :key="i"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>

.empty-header {
    padding: 2rem 1rem;
}

.cards-container {
  flex-grow: 1;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.25rem;
  transition: 0.2s;
  justify-items: stretch;
}
</style>