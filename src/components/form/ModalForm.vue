<template>
  <v-dialog v-model="state.formState" max-width="500">
    <v-card class="white">
      <v-card-title>
        <span class="headline">{{state.currentBlock.clazz}}</span>
      </v-card-title>
      <v-card-text>
              <v-text-field v-model="state.currentBlock.name" label="Name"></v-text-field>
              <v-text-field v-for="(value, key) in state.currentBlock.fields" v-bind:label="key | capitalize" v-model="state.currentBlock[key]" v-bind:key="key"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ZModalForm',
  inject: ['stateService'],
  data () {
    return {
      state: this.stateService.state
    }
  },
  methods: {
    close () {
      this.stateService.setFormState(false)
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
