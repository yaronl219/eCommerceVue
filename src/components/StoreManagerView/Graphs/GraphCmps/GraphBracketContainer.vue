<template>
  <v-card>
      <v-card-title>
          {{title}}
      </v-card-title>
      <slot></slot>
  </v-card>
</template>

<script>
import {chartService} from '@/services/chartService.js'

export default {
    props: ['title'],
    created() {
        chartService.getChartData('users')
    }
}
</script>

<style>

</style>