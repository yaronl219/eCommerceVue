<template>
  <div class="store-manager-page-container">
    <manager-sidebar />
    <v-main>
    <router-view />
    </v-main>
  </div>
</template>

<script>
import ManagerSidebar from '../../components/StoreManagerView/ManagerSidebar.vue';

export default {
  components: {
    ManagerSidebar
    
  },
  async created() {
      this.loadItems()
  },
  methods: {
    async loadItems() {
      this.$store.dispatch({ type: "loadItems" });
    },
  },
};
</script>

<style>
.store-manager-page-container {
  display: flex;
}
</style>