<template>
  <div class="category-menu">
    <v-navigation-drawer v-if="isVertical" :value="true" app permanent clipped width="200px">
      <category-menu :isVertical="isVertical" />
    </v-navigation-drawer>
    <v-app-bar fixed v-if="!isVertical" v-bind:style="{top:'56px',zIndex:1}">
        <category-menu :isVertical="isVertical" :windowWidth="windowWidth" />
    </v-app-bar>
  </div>
</template>

<script>
import CategoryMenu from "./CategoryMenu.vue";
export default {
  components: { CategoryMenu },
  data() {
    return {
      windowWidth: window.innerWidth,
      isVertical: true,
    };
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.onResize()
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 600) {
        if (this.isVertical) {
          this.isVertical = false;
        }
      } else {
        if (!this.isVertical) {
          this.isVertical = true;
        }
      }
    },
  },
};
</script>

<style>
</style>