<template>
      <v-card>
      <v-card-title>
        New Category
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onSaveCategory">
          <v-text-field v-model="categoryTitle" label="Category Title" required>
          </v-text-field>
        </v-form>
        <v-card-actions>
          <v-btn color="primary" @click="onSaveCategory">
            Save
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            categoryTitle: ''
        }
    },
methods: {
    onSaveCategory() {
        if (!this.categoryTitle) return
        this.$emit('add-category',this.categoryTitle)
    }
}
}
</script>

<style>

</style>