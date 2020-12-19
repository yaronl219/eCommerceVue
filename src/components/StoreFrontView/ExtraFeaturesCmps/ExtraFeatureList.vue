<template>
  <div class="extra-features-list-container">
    <v-card>
      <v-card-title>{{title}}</v-card-title>
      <ul>
        <extra-feature-item
          v-for="extra in extras"
          :key="extra.id"
          :isEditable="isEditable"
          :extra="extra"
          :addedExtras="addedExtras"
          @check-feature="onCheck"
        />
      </ul>
    </v-card>
  </div>
</template>

<script>
import ExtraFeatureItem from "./ExtraFeatureItem.vue";
export default {
  components: { ExtraFeatureItem },
  props: ["extras", "isEditable", "addedExtras","title"],
  methods: {
    onCheck(extra) {
      this.$emit("check-feature", extra);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0px;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem
}
</style>