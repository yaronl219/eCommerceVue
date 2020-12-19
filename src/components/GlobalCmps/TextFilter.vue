<template>
  <div class="filter-container">
      <v-text-field label="Search products by name" v-model="filterBy" @input="onChange" />
  </div>
</template>

<script>
export default {
    data() {
        return {
            filterBy: ''
        }
    },
    methods: {
        onChange() {
            this.$emit('filter-by',this.filterBy)
        }
    }
}
</script>

<style lang="scss" scoped>
.filter-container {
    padding: 0.5rem;
}
    input {
        width: 100%;
        border-radius: 0.25rem;
        border: 1px solid rgb(32,32,32);
        padding: 0 0.125rem;
        font-size: 1rem;
        line-height: 1.25rem;
    }
</style>