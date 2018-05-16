<template>
  <div class="yaml-viewer">
    <v-navigation-drawer stateless v-model="state.viewer.drawer">
      <v-btn v-on:click="copyToClipboard" light icon absolute right>
        <v-icon>content_copy</v-icon>
      </v-btn>
      <code id="yaml-text" v-html="yaml"></code>
    </v-navigation-drawer>
    <v-layout justify-end>
      <v-btn id="yaml-button" v-on:click="switchDrawer" :disabled="yaml.length === 0">
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
    yaml () {
      this.stateService.setViewerDirty(false)
      return this.generatorService.generate(this.stateService.currentWorkflow,
        this.jsPlumbService.getAllConnections(this.stateService.currentWorkflow), this.state.viewer.viewerDirty)
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
.yaml-viewer code {
  display: block;
  max-height: 500px;
  overflow: auto;
}
#yaml-button{
  position: relative;
  right: 100%;
}
</style>
