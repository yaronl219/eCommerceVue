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
};
</script>

<style>
.store-manager-page-container {
  display: flex;
}
</style>