<template>
  <v-toolbar class="header-toolbar" dense fixed app>
    <v-toolbar-side-icon @click.stop="switchDrawer"></v-toolbar-side-icon>
    <img src="../../assets/logo.png" class="main-logo-toolbar" alt="logo Edimus"/>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="clearWorflow" flat>Clear Workflow</v-btn>
      <v-btn @click="importYamlInput" flat>Import YAML file</v-btn>
      <input type="file" id="yaml-file-input" @change="importYaml" hidden>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import _ from 'lodash'
import Block from '../../models/block'

function getBlockType (word) {
  const wordSplit = word.split('.')
  return wordSplit[wordSplit.length - 3].toLowerCase()
}

export default {
  name: 'ZHeaderToolbar',
  inject: ['workflowService', 'uuidService', 'generatorService', 'stateService', 'jsPlumbService'],
  methods: {
    switchDrawer () {
      this.stateService.setDrawerOpen(!this.stateService.currentNavigatorState.drawer)
    },

    clearWorflow () {
      this.stateService.currentWorkflow.clear()
      this.jsPlumbService.clearWorkflow(this.stateService.currentWorkflow)
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
        let finalGrid = []
        let levelArray = []
        let positionX = 230
        let positionY = 230

        yamlToJson = this.generatorService.loadFromYaml(e.target.result)

        _.forIn(yamlToJson, (value, key) => {
          if (getBlockType(value.class) === 'input') {
            value.name = key
            levelArray.push(value)
            delete yamlToJson[key]
          }
        })
        finalGrid.push(levelArray)

        while (Object.keys(yamlToJson).length !== 0) {
          levelArray = []
          finalGrid[finalGrid.length - 1].forEach(block => {
            _.forIn(yamlToJson, (value, key) => {
              if (value.source.includes(block.name)) {
                value.name = key
                levelArray.push(value)
                delete yamlToJson[key]
              }
            })
          })
          if (levelArray.length !== 0) {
            finalGrid.push(levelArray)
          }
        }

        finalGrid.forEach(blockColumn => {
          blockColumn.forEach(value => {
            const blockId = this.uuidService.uuid()
            const type = getBlockType(value.class)
            const block = new Block(blockId, value.name, type, value.class, value.config)
            block.setPosition(positionX, positionY)
            positionY += 200

            blockMap[value.name] = {
              'id': blockId,
              'source': value.source
            }

            this.workflowService.addBlockToWorkflow(currentWorkflow, block)
            this.stateService.setViewerDirty(true)
          })
          positionX += 250
          positionY = 230
        })

        this.$nextTick(() => {
          _.forIn(blockMap, (value, key) => {
            if (value.source) {
              value.source.forEach(e => {
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
.main-logo-toolbar{
  height: 100%;
}
</style>
