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
import constants from '../../constants/constants'

function createWorkflow (id, blocks, links) {
  const workflow = new Workflow(id)
  blocks.map(createBlock).forEach(b => workflow.addBlock(b))
  return {
    workflow,
    links
  }
}

function createBlock ({id, name, type, clazz, fields}) {
  return new Block(id, name, type, clazz, fields)
}

export default {
  name: 'ZMainBoard',
  inject: ['workflowService', 'uuidService', 'nameService', 'stateService', 'jsPlumbService', 'storageService'],
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
        const el = data.el()
        const block = new Block(this.uuidService.uuid(), this.nameService.name, def.type, def.name, _.cloneDeep(def.config))
        block.setPosition(event.offsetX - el.offsetWidth / 2, event.offsetY - el.offsetHeight / 2)
        this.workflowService.addBlockToWorkflow(this.stateService.currentWorkflow, block)
        this.stateService.setViewerDirty(true)
        this.storageService.set(this.stateService.currentWorkflow, this.jsPlumbService.getAllConnections(this.stateService.currentWorkflow), constants.storageKeys.workflow)
      }
    }
  },
  // TODO: Refactor this code or completely change it
  created () {
    this.storageService.keys().then(keys => {
      return keys.filter(e => e.startsWith(constants.storageKeys.workflow))
    }).then(keys => {
      if (keys.length > 0) {
        this.storageService.iterate(({workflow, links}) => {
          this.workflowService.addWorkflow(createWorkflow(workflow.id, workflow.blocks, links))
        }, constants.storageKeys.workflow).then(() => {
          this.storageService.getCurrent(constants.storageKeys.current).then(element => {
            this.stateService.setCurrentWorkflow(this.workflowService.getWorkflow(element.workflow.id))
            this.blocks = this.stateService.currentWorkflow.blocks
            this.jsPlumbService.listenToConnectionChanges(this.stateService.currentWorkflow, () => {
              this.stateService.setViewerDirty(true)
              this.storageService.set(this.stateService.currentWorkflow, this.jsPlumbService.getAllConnections(this.stateService.currentWorkflow), constants.storageKeys.workflow)
            })
          }).then(() => {
            this.$nextTick(() => {
              const currentWorkflow = this.stateService.currentWorkflow
              const links = this.workflowService.getWorkflowAndLinks(currentWorkflow.id).links
              links.forEach(c => {
                this.jsPlumbService.connect(currentWorkflow, c.sourceId, c.targetId)
              })
            })
          })
        })
      } else {
        const workflowAndLinks = createWorkflow(this.uuidService.uuid(), [], [])
        this.workflowService.addWorkflow(workflowAndLinks)
        this.blocks = workflowAndLinks.workflow.blocks
        this.stateService.setCurrentWorkflow(workflowAndLinks.workflow)
        this.storageService.set(workflowAndLinks.workflow, [], constants.storageKeys.workflow)
        this.storageService.setCurrent(constants.storageKeys.current, workflowAndLinks.workflow, [])
        this.jsPlumbService.listenToConnectionChanges(this.stateService.currentWorkflow, () => {
          this.stateService.setViewerDirty(true)
        })
      }
    })
  }
}

</script>

<style scoped>
  .mainboard {
    height: 100vh;
    position: relative;
  }
</style>
