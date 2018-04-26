<template>
  <div class="yaml-viewer">
    <v-navigation-drawer stateless right v-model="state.viewer.drawer">
        <code class="pa-1" v-html="yaml"></code>
    </v-navigation-drawer>
    <v-layout justify-end absolute>
      <v-btn @click.stop="state.viewer.drawer = !state.viewer.drawer" :disabled="yaml.length === 0" dark color="pink">view yaml</v-btn>
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
      this.stateService.setViewerDrawerOpen(this.stateService.currentViewerState.drawer)
    }
  },
  components: {}
}
</script>

<style scoped>
  .yaml-viewer{
    position: fixed;
    bottom: 0;
    right: 0;
  }
  .yaml-viewer code {
    display: block;
    max-height: 500px;
    overflow: auto;
  }
</style>
