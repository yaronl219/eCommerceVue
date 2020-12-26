<template>
  <div class="mobile-screen-warning">
    <v-card v-if="isOnMobile">
      <v-card-title> Hey! it looks like you're on mobile </v-card-title>
      <v-card-text>
        <p>
          While you can absolutely keep using this section on a mobile device,
          We recommend that the "Store Manager" section will be only used on a
          desktop
        </p>
        <p>
          If you prefer to keep using on a mobile, you can select a section in
          the left toolbar
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOnMobile: false,
    };
  },
  created() {
    if (window.innerWidth > 600)  return this.$router.push("/admin/graphs")
    this.isOnMobile = true

  },
};
</script>

<style scoped>
.mobile-screen-warning {
    padding: 1rem;

}
</style>