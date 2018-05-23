<template>
  <v-toolbar class="header-toolbar" dense fixed app>
    <v-toolbar-side-icon @click.stop="switchDrawer"></v-toolbar-side-icon>
    <v-toolbar-title class="title">Editor</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="importYamlInput" flat>Import YAML file</v-btn>
      <input type="file" id="yaml-file-input" @change="importYaml" hidden>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import _ from 'lodash'
import Block from '../../models/block'
import constants from '../../constants/constants'

function getBlockType (word) {
  const wordSplit = word.split('.')
  return wordSplit[wordSplit.length - 3].toLowerCase()
}

export default {
  name: 'ZHeaderToolbar',
  inject: ['workflowService', 'uuidService', 'generatorService', 'stateService', 'jsPlumbService', 'storageService'],
  methods: {
    switchDrawer () {
      this.stateService.setDrawerOpen(!this.stateService.currentNavigatorState.drawer)
    },

    importYamlInput () {
      document.getElementById('yaml-file-input').click()
    },

    importYaml (ev) {
      const currentWorkflow = this.stateService.currentWorkflow
      let blockMap = {}
      let yamlToJson = ''
      const reader = new FileReader()
      const file = ev.target.files[0]

      reader.onload = e => {
        yamlToJson = this.generatorService.loadFromYaml(e.target.result)
        _.forIn(yamlToJson, (value, key) => {
          const blockId = this.uuidService.uuid()
          const block = new Block(blockId, key, getBlockType(value.class), value.class, value.config)
          blockMap[key] = {}
          blockMap[key].id = blockId
          blockMap[key].sources = value.sources
          block.setPosition(400, 400)
          this.workflowService.addBlockToWorkflow(currentWorkflow, block)
          this.stateService.setViewerDirty(true)
          this.storageService.set(currentWorkflow, this.jsPlumbService.getAllConnections(currentWorkflow), constants.storageKeys.workflow)
        })
        this.$nextTick(() => {
          _.forIn(blockMap, (value, key) => {
            if (value.sources) {
              value.sources.forEach(e => {
                this.jsPlumbService.connect(currentWorkflow, blockMap[e].id, value.id)
              })
            }
          })
        })
      }
      reader.readAsText(file)
    }
  }
}
</script>

<style scoped>
.header-toolbar {
  opacity: 0.7;
}
</style>
