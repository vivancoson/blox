<template>
  <v-app dark fluid>
    <div id="app">
      <v-layout row wrap>
        <z-header-toolbar></z-header-toolbar>
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
import ZHeaderToolbar from './components/header/HeaderToolbar'
import ZSideBoard from './components/sideboard/Sideboard'
import ZMainBoard from './components/mainboard/Mainboard'
import ZModalForm from './components/form/ModalForm'
import ZViewer from './components/viewer/Viewer.vue'

export default {
  name: 'App',
  components: {
    ZHeaderToolbar,
    ZSideBoard,
    ZMainBoard,
    ZModalForm,
    ZViewer
  }
}
</script>

<style>
*,
.theme--dark .btn {
  color: #f4f1d0;
}
#app {
  font-family: "Roboto", sans-serif;
}
.navigation-drawer {
  height: auto;
  padding: 0px;
}
.jtk-endpoint {
  z-index: 1;
}
.jtk-drag {
  z-index: 2;
}
</style>
