<template>
  <drop class="drop mainboard" @drop="handleDrop">
      <z-main-block v-for="block in blocks" v-bind:block="block" v-bind:key="block.id">
      </z-main-block>
  </drop>
</template>

<script>

import ZMainBlock from './MainboardBlock'
import Workflow from '../../models/workflow'
import Block from '../../models/block'

export default {
  name: 'ZMainBoard',
  inject: ['workflowService', 'uuidService', 'nameService', 'stateService'],
  components: {ZMainBlock},
  data () {
    return {
      blocks: []
    }
  },
  methods: {
    handleDrop ({def}, event) {
      const block = new Block(this.uuidService.uuid(), this.nameService.name, def.type, def.name, def.config)
      block.setPosition(event.pageX, event.pageY)
      this.workflowService.addBlockToWorkflowById(0, block)
    }
  },
  created () {
    const workflow = new Workflow(0)
    this.workflowService.addWorkflow(workflow)
    this.blocks = workflow.blocks
    this.stateService.setCurrentWorkflow(workflow)
  }
}
</script>

<style scoped>
  .mainboard {
    height: 1980px;
  }
</style>
