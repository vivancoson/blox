<template>
  <drop id="container" class="drop mainboard" @drop="handleDrop">
    <z-main-block v-bind:id="block.id" v-for="block in blocks" v-bind:block="block" v-bind:key="block.id">
    </z-main-block>
  </drop>
</template>

<script>

import _ from 'lodash'
import ZMainBlock from './MainboardBlock'
import Workflow from '../../models/workflow'
import Block from '../../models/block'

export default {
  name: 'ZMainBoard',
  inject: ['workflowService', 'uuidService', 'nameService', 'stateService', 'jsPlumbService'],
  components: {ZMainBlock},
  data () {
    return {
      blocks: []
    }
  },
  methods: {
    handleDrop (data, event) {
      if (data) {
        const def = data.def
        const block = new Block(this.uuidService.uuid(), this.nameService.name, def.type, def.name, _.cloneDeep(def.config))
        block.setPosition(event.offsetX - 60, event.offsetY - 50)
        this.workflowService.addBlockToWorkflowById(0, block)
        this.stateService.setViewerDirty(true)
      }
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
    height: 100vh;
    position: relative;
  }
</style>
