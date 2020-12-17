<template>
  <div class="extra-features-container">
    <extra-feautre v-for="extra of extras" :key="extra.id" :extra="extra" :includePrice="includePrice"></extra-feautre>
    <add-feature :includePrice="includePrice" @add-feature="addFeature"></add-feature>
  </div>
</template>

<script>
import AddFeature from './AddFeature.vue';
import ExtraFeautre from './ExtraFeautre.vue';
export default {
  components: { ExtraFeautre, AddFeature },
  props: ["includePrice","extras"],
  methods: {
    addFeature(feature) {
      this.$emit('add-feature',feature)
    }
  }
};
</script>

<style>
</style>