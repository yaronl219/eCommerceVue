<template>
  <v-card class="extra-features-container">
    <v-card-title v-if="title">{{title}}</v-card-title>
    <extra-feautre v-for="extra of extras" :key="extra.id" :extra="extra" :includePrice="includePrice" @delete-feature="onDeleteFeature"></extra-feautre>
    <add-feature :includePrice="includePrice" @add-feature="addFeature"></add-feature>
  </v-card>
</template>

<script>
import AddFeature from './AddFeature.vue';
import ExtraFeautre from './ExtraFeautre.vue';
export default {
  components: { ExtraFeautre, AddFeature },
  props: ["includePrice","extras","title"],
  methods: {
    addFeature(feature) {
      this.$emit('add-feature',feature)
    },
    onDeleteFeature(featureId) {
      this.$emit('delete-feature',featureId)
    }
  }
};
</script>

<style lang="scss" scoped>
.extra-features-container {
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  
}
</style>