<template>
  <v-layout row justify-center>
    <v-dialog v-model="form.state" max-width="600">
      <v-card>
        <v-card-title>
          <span class="headline">{{blockCopy.clazz}}</span>
        </v-card-title>
        <v-form ref="formCustomBlock" v-model="valid" lazy-validation>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="blockCopy.name"
                    :rules="[() => !!blockCopy.name || 'Veuillez entrer un nom']"
                    label="Nom"
                    hint="Nom du bloc"
                    required
                  ></v-text-field>
                  <v-flex xs12>
                    <h3>Config:</h3>
                  </v-flex>
                  <div v-bind:key="key" v-for="(value, key) in blockCopy.fields">
                  <v-text-field
                    v-if="!blockCopy.suggestions[key].length"
                    v-bind:label="key | capitalize"
                    v-model="blockCopy.fields[key]"
                    v-bind:hint="blockCopy.details[key].description | capitalize"
                  ></v-text-field>
                  <v-autocomplete
                    v-if="blockCopy.suggestions[key].length"
                    v-bind:label="key | capitalize"
                    v-model="blockCopy.fields[key]"
                    v-bind:hint="blockCopy.details[key].description | capitalize"
                    v-bind:items="blockCopy.suggestions[key]"
                    ></v-autocomplete>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*Champs obligatoires</small>
          </v-card-text>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="close">Fermer</v-btn>
          <v-btn flat @click.native="save" :disabled="!valid">Sauvegarder</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

import _ from 'lodash'

export default {
  name: 'ZModalForm',
  inject: ['stateService'],
  data () {
    return {
      valid: false,
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
      if (this.$refs.formCustomBlock.validate()) {
        this.workflow.currentBlock.name = this.blockCopy.name
        _.forOwn(this.blockCopy.fields, (value, key) => {
          this.workflow.currentBlock.fields[key] = value
        })
        this.stateService.setFormState(false)
      }
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style scoped>
.headline{
  overflow: hidden;
  overflow-wrap: break-word;
}
</style>
