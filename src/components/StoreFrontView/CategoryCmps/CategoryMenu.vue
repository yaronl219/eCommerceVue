<template>
  <div class="category-menu">
    <v-navigation-drawer
      :value="true"
      app
      permanent
      clipped
      width="200px"
    >
      <div class="inner-container">
        <ul v-if="$store.getters.renderedCategoriesLength">
          <li
            v-for="category of categories"
            :key="category._id"
            v-scroll-to="{
              el: 'body',
              offset: $store.getters.categoryPosById(category._id),
            }"
          >
            <v-list-item>{{ category.title }}</v-list-item>
          </li>
        </ul>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Vue from "vue";
var VueScrollTo = require("vue-scrollto");
Vue.use(VueScrollTo);

export default {
  computed: {
    categories() {
      return this.$store.getters.storeCategories;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 600px) {
  .category-menu {
    position: relative;
    // width: 250px;
  }

  .inner-container {
    // position: fixed;
  }
}

ul {
    list-style: none;
}

li {
    cursor: pointer;
}
</style>