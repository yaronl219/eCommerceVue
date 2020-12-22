<template>
  <div class="inner-container">
    <ul
      v-if="$store.getters.renderedCategoriesLength"
      v-bind:class="{ horizontal: !isVertical }"
      v-bind:style="{ width: windowWidth - 40 + 'px' }"
    >
      <li
        v-for="category of categories"
        :key="category._id"
        v-scroll-to="{
          el: 'body',
          offset: $store.getters.categoryPosById(category._id),
        }"
      >
        {{ category.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
var VueScrollTo = require("vue-scrollto");
Vue.use(VueScrollTo);

export default {
  props: ["isVertical", "windowWidth"],
  computed: {
    categories() {
      return this.$store.getters.storeCategories.filter(category => category.isVisible);
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 600px) {
  .category-menu {
    position: relative;
  }
}
ul {
  list-style: none;
}


li {
  font-weight: 500;
  cursor: pointer;
  margin: 1.5rem 0rem;
}
.horizontal {
  margin: 0px;
  padding: 0px;
  overflow-x: scroll;
  display: flex;
  padding: 1rem;
  li {
    margin-right: 2rem;
    display: flex;
    align-items: center;
  }
}


</style>