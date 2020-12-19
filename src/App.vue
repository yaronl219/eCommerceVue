<template>
  <div id="app">
    <v-app>
      <navbar />
      <router-view />
    </v-app>
  </div>
</template>

<script>
import Navbar from "./components/GlobalCmps/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
@import "./assets/styles/global";
</style>
