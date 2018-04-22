<template>
  <div v-bind:style="{ left: block.positionX + 'px', top: block.positionY + 'px' }" v-bind:class="color" class="sideboard-block elevation-3 white--text">
    <h5 class="pb-2 mt-1">
      {{block.clazz}}
    </h5>
    <div class="bloc-info">
      <h5>
        {{block.name}}
      </h5>
    </div>
    <div class="block-actions">
      <v-btn v-on:click="removeBlock" small icon>
        <v-icon small dark>remove</v-icon>
      </v-btn>
      <v-btn v-on:click="selectBlock" small icon>
        <v-icon small dark>edit</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>

import constants from '../../constants/constants'

export default {
  name: 'ZMainBlock',
  inject: ['stateService', 'workflowService'],
  computed: {
    color () {
      console.log(this.block)
      return constants.blockTypes[this.block.type].color
    }
  },
  methods: {
    removeBlock () {
      const currentWorkflow = this.stateService.currentWorkflow
      this.workflowService.removeBlockFromWorkflow(currentWorkflow, this.block)
      console.log(currentWorkflow)
    },
    selectBlock () {
      this.stateService.setCurrentBlock(this.block)
      this.stateService.setFormState(true)
    }
  },
  props: ['block'],
  components: {}
}
</script>

<style scoped>

  .sideboard-block {
    position: absolute;
    width: 120px;
    height: 100px;
    border-radius: 5%;
  }

</style>
