<template>
  <div class="yaml-viewer">
    <v-navigation-drawer stateless v-model="state.viewer.drawer">
      <div class="yaml-viewer-toolbar">
        <v-btn v-on:click="copyToClipboard" light icon>
          <v-icon>content_copy</v-icon>
        </v-btn>
        <v-btn v-on:click="downloadYaml('worflow.yaml')" light icon>
          <v-icon>save_alt</v-icon>
        </v-btn>
      </div>
      <code id="yaml-text" v-html="yamlForHTML"></code>
    </v-navigation-drawer>
    <v-layout justify-end>
      <v-btn id="yaml-button" v-on:click="switchDrawer" :disabled="yamlForHTML.length === 0">
        <span>{{ state.viewer.drawer ? 'view yaml' : 'hide yaml' }}</span>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'ZViewer',
  inject: ['stateService', 'generatorService', 'jsPlumbService'],
  data () {
    return {
      state: this.stateService.state
    }
  },
  computed: {
    yamlForHTML () {
      this.stateService.setViewerDirty(false)
      return this.generatorService.generateYamlViewerHTML(this.yaml())
    }
  },
  methods: {
    switchDrawer () {
      let nextState = !this.stateService.currentViewerState.drawer
      this.stateService.setViewerDrawerOpen(nextState)
    },
    copyToClipboard () {
      window.getSelection().selectAllChildren(document.getElementById('yaml-text'))
      document.execCommand('copy')
    },
    yaml () {
      this.stateService.setViewerDirty(false)
      return this.generatorService.generate(
        this.stateService.currentWorkflow,
        this.jsPlumbService.getAllConnections(this.stateService.currentWorkflow),
        this.state.viewer.viewerDirty
      )
    },
    downloadYaml (filename) {
      const file = new Blob([this.yaml()], {type: 'application/x-yaml;charset=utf-8'})
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename)
      } else {
        const a = document.createElement('a')
        const url = URL.createObjectURL(file)
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        setTimeout(function () {
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
        }, 0)
      }
    }
  }
}
</script>

<style scoped>
.yaml-viewer{
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 100%;
}
.yaml-viewer-toolbar{
  position: absolute;
  right: 0;
}
.yaml-viewer code {
  display: block;
  max-height: 500px;
  padding: 10px;
  overflow: auto;
}
#yaml-button{
  position: relative;
  right: 100%;
}
.v-navigation-drawer {
  padding: 0;
}
</style>
