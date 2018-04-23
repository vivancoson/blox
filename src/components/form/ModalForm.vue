<template>
  <v-dialog v-model="form.state" max-width="500">
    <v-card class="white">
      <v-card-title>
        <span class="headline">{{blockCopy.clazz}}</span>
      </v-card-title>
      <v-card-text>
              <v-text-field v-model="blockCopy.name" label="Name"></v-text-field>
              <v-text-field v-for="(value, key) in blockCopy.fields" v-bind:label="key | capitalize" v-model="blockCopy.fields[key]" v-bind:key="key"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import _ from 'lodash'

export default {
  name: 'ZModalForm',
  inject: ['stateService'],
  data () {
    return {
      workflow: this.stateService.state.workflow,
      form: this.stateService.state.form
    }
  },
  computed: {
    blockCopy () {
      return _.cloneDeep(this.workflow.currentBlock)
    }
  },
  methods: {
    close () {
      this.stateService.setFormState(false)
    },
    save () {
      this.workflow.currentBlock.name = this.blockCopy.name
      _.forOwn(this.blockCopy.fields, (value, key) => {
        this.workflow.currentBlock.fields[key] = value
      })
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
