<template>
  <v-app dark fluid>
    <div id="app">
      <v-layout row wrap>
        <v-toolbar class="header-toolbar" dense fixed app>
          <v-toolbar-side-icon @click.stop="switchDrawer"></v-toolbar-side-icon>
          <v-toolbar-title>
            <span class="title">Editor</span>
          </v-toolbar-title>
        </v-toolbar>
        <z-side-board></z-side-board>
        <v-flex xs12>
          <z-main-board></z-main-board>
        </v-flex>
        <z-modal-form></z-modal-form>
      </v-layout>
      <z-viewer></z-viewer>
    </div>
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
      this.stateService.setDrawerOpen(!this.stateService.currentNavigatorState.drawer)
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
*, .theme--dark .btn{
  color: #f4f1d0;
}
#app {
  font-family: 'Roboto', sans-serif;
}
.header-toolbar{
  opacity: 0.7;
}
.navigation-drawer {
  height: auto;
  padding: 0px;
}
.jtk-endpoint{
  z-index: 1;
}
.jtk-drag{
  z-index: 2;
}
</style>
