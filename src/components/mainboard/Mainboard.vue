<template>
  <drop id="container" class="drop mainboard" @drop="handleDrop">
    <z-main-block v-bind:id="block.id" v-for="block in blocks" v-bind:block="block" v-bind:key="block.id">
    </z-main-block>
  </drop>
</template>

<script>

import _ from 'lodash'
import ZMainBlock from './MainboardBlock'
import Block from '../../models/block'
import Workflow from '../../models/workflow'

export default {
  name: 'ZMainBoard',
  inject: ['workflowService', 'uuidService', 'nameService', 'stateService', 'jsPlumbService', 'blockService'],
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
        const block = new Block(this.uuidService.uuid(), def.name + 'Block', def.type, def.clazz, _.cloneDeep(def.config), def.details, def.suggestions)
        block.setPosition(event.offsetX - 90, event.offsetY - 75)
        this.workflowService.addBlockToWorkflow(this.stateService.currentWorkflow, block)
        this.stateService.setViewerDirty(true)
      }
    }
  },
  created () {
    const workflow = new Workflow(this.uuidService.uuid())
    this.workflowService.addWorkflow({
      workflow,
      links: []
    })
    this.stateService.setCurrentWorkflow(workflow)
    this.blocks = workflow.blocks
    this.jsPlumbService.listenToConnectionChanges(workflow, () => {
      this.stateService.setViewerDirty(true)
    })
  }
}
</script>

<style scoped>
.mainboard {
  height: 1000vh;
  width: 1000vw;
  position: relative;
  background: #303030 url('../../assets/dark-wood.png') repeat;
}
</style>
