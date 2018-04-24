<template>
  <v-app dark id="app" fluid>
    <v-layout row wrap>
      <v-toolbar color="blue" dense fixed app>
        <v-toolbar-side-icon @click.stop="switchDrawer"></v-toolbar-side-icon>
        <v-toolbar-title class="mr-5 align-center">
          <span class="title">Editor</span>
        </v-toolbar-title>
      </v-toolbar>
      <z-side-board></z-side-board>
      <v-flex xs12>
        <z-main-board></z-main-board>
      </v-flex>
      <z-modal-form></z-modal-form>
    </v-layout>
    <z-viewer absolute></z-viewer>
  </v-app>
</template>

<script>
import ZSideBoard from './components/sideboard/Sideboard'
import ZMainBoard from './components/mainboard/Mainboard'
import ZModalForm from './components/form/ModalForm'
import ZViewer from './components/viewer/Viewer.vue'

export default {
  name: 'App',
  inject: ['stateService'],
  methods: {
    switchDrawer () {
      this.stateService.setDrawerOpen(!this.stateService.state.navigator.drawer)
    }
  },
  components: {
    ZSideBoard,
    ZMainBoard,
    ZModalForm,
    ZViewer
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
}
.navigation-drawer {
  height: auto;
  padding: 0px;
}
</style>
