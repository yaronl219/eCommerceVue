<template>
  <div class="filter-container">
    <div class="search-container">
      <v-text-field
        label="Search products by name"
        v-model="filterBy"
        @input="shouldOpen"
      />
      <div
        class="dropdown-arrow-container"
        v-bind:class="{ 'upside-down': isDropDownOpen }"
        @click="toggleDropdown"
      >
        <v-icon> mdi-chevron-down </v-icon>
      </div>
    </div>
    <div v-if="isDropDownOpen" class="selection-dropdown">
      <ul v-if="items.length">
        <li v-for="item of items" :key="item._id">
          <div class="autocomplete-item" @click="() => onClickItem(item._id)">
            <product-image :imgUrl="item.img" />
            <div class="item-title">{{ item.title }}</div>
          </div>
        </li>
      </ul>
      <div v-if="!items.length" class="empty-state-container">
        <div v-if="filterBy">
          Looks like there are no items with that name. try revising your
          search.
        </div>
        <div v-if="!filterBy">Try searching for a product</div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductImage from "../../GlobalCmps/ProductImage.vue";
export default {
  props: ["shouldOnlyEmit"],
  components: { ProductImage },
  data() {
    return {
      filterBy: "",
      isDropDownOpen: false,
    };
  },
  computed: {
    items() {
      const items = this.$store.getters.itemsToDisplay;
      if (!items || !this.filterBy) return [];
      return items.filter((item) =>
        item.title.toLowerCase().includes(this.filterBy.toLowerCase())
      );
    },
  },
  methods: {
    shouldOpen() {
      if (this.filterBy) {
        this.isDropDownOpen = true;
      } else {
        this.isDropDownOpen = false;
      }
    },
    onClickItem(itemId) {
      if (this.shouldOnlyEmit) {
        this.$emit("selected-item", itemId);
        this.isDropDownOpen = false;
      } else {
        this.$router.push(`/add?editid=${itemId}`);
      }
    },
    toggleDropdown() {
      this.isDropDownOpen = !this.isDropDownOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  padding: 0.5rem;
  position: relative;
}

.search-container {
  position: relative;
  .dropdown-arrow-container {
    position: absolute;
    top: 1rem;
    right: 1rem;
    transition: 0.3s;
    cursor: pointer;
  }
  .upside-down {
    transform: rotate(180deg);
  }
}
.selection-dropdown {
  position: absolute;
  z-index: 3;
  background-color: white;
  width: calc(100% - 16px);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.125rem;
  top: 57px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
}

.autocomplete-item {
  cursor: pointer;
  display: grid;
  padding: 0.25rem 0.5rem;
  grid-template-columns: 3.5rem 1fr;
  grid-template-rows: 2.5rem;
  gap: 1rem;
  .item-title {
    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.17);
    transition: 0.15s;
  }
}

.empty-state-container {
  padding: 1rem 0.5rem;
}

input {
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid rgb(32, 32, 32);
  padding: 0 0.125rem;
  font-size: 1rem;
  line-height: 1.25rem;
}
</style>