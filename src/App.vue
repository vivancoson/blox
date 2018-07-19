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
import ZHeaderToolbar from './components/header/HeaderToolbar.vue';
import ZSideBoard from './components/sideboard/Sideboard.vue';
import ZMainBoard from './components/mainboard/Mainboard.vue';
import ZModalForm from './components/form/ModalForm.vue';
import ZViewer from './components/viewer/Viewer.vue';

export default {
  name: 'App',
  components: {
    ZHeaderToolbar,
    ZSideBoard,
    ZMainBoard,
    ZModalForm,
    ZViewer,
  },
};
</script>

<style>
html {
  overflow: auto;
}
.theme--dark .v-btn,
.theme--dark .v-card {
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
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: #212121;
}
::-webkit-scrollbar-thumb {
  background: #f4f1d0;
}
</style>
