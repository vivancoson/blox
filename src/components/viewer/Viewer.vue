<template>
  <div class="yaml-viewer">
    <pre class="yaml-code">
      <code class="pa-1" v-html="yaml"></code>
    </pre>
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
      return this.generatorService.generate(this.stateService.currentWorkflow, this.jsPlumbService.getAllConnections(), this.state.viewerDirty)
    }
  },
  created () {
    this.jsPlumbService.listenToConnectionChanges(() => {
      this.stateService.setViewerDirty(true)
    })
  },
  components: {}
}
</script>

<style scoped>
  .yaml-viewer code {
    display: block;
  }
</style>
