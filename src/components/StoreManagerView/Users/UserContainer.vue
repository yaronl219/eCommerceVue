<template>
  <div class="order-preview-list-container">
    <v-card-title>Users</v-card-title>

    <order-filter-container @update-filter="onUpdateQuery" />
    <div v-if="isLoading" class="loader">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-if="!isLoading" class="users-preview-container">
      <user-preview
        v-for="user of users"
        :user="user"
        :key="user._id.phone"
        @select-user="onSelectUser"
        :isSelected="selectedUser === user._id.phone"
      />
    </div>

    <v-footer app>
      <div class="pagination-container">
        <v-pagination
          v-model="page"
          :length="length"
          @input="onSwitchPage"
          total-visible="7"
        ></v-pagination>
      </div>
    </v-footer>
    <v-navigation-drawer
      :value="!!selectedUser"
      right
      app
      clipped
      stateless
      
      temporary
      hide-overlay
      width="75%"
    >
      <user-pane-container :userPhoneNumber="this.selectedUser" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { userService } from "@/services/userService";
import OrderFilterContainer from "../OrdersCmps/OrderFilter/OrderFilterContainer.vue";
import UserPreview from "./UserPreview.vue";
import UserPaneContainer from "./UserPane/UserPaneContainer.vue";

export default {
  components: {
    OrderFilterContainer,
    UserPreview,
    UserPaneContainer,
  },
  data() {
    return {
      users: null,
      isLoading: false,
      page: 1,
      length: 1,
      query: [],
      selectedUser: null,
    };
  },
  async created() {
    this.getUsers(this.page);
    this.updateUserFromQuery();
  },
  watch: {
    "$route.query.user"() {
      this.updateUserFromQuery();
    },
  },
  methods: {
    async getUsers() {
      this.isLoading = true;
      const res = await userService.getUsers(this.page, this.query);
      this.users = res.users
      this.length = Math.ceil(res.totalUsers/10)
      this.isLoading = false;
    },
    onSwitchPage(page) {
      this.page = page;
      this.getUsers();
    },
    onUpdateQuery(query) {
      this.query = query;
      this.getUsers();
    },
    onSelectUser(phoneNumber) {
      if (phoneNumber === this.selectedUser) return;
      this.$router.push(`/admin/users?user=${phoneNumber}`);
    },
    updateUserFromQuery() {
      const { user } = this.$route.query;
      if (user === this.selectedUser) return;
      if (!user) this.selectedUser = null; 
      this.selectedUser = user;
    },
  },
};
</script>

<style lang="scss" scoped>
.order-preview-list-container {
  padding: 1rem;
}

.loader {
  display: flex;
  justify-content: center;
}
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>