<template>
  <v-container id="app" fluid>
    <v-layout row wrap>
      <v-flex xs2>
        <z-side-board></z-side-board>
      </v-flex>
      <v-flex xs10>
        <z-main-board></z-main-board>
      </v-flex>
      <z-modal-form></z-modal-form>
    </v-layout>
    <z-viewer></z-viewer>
  </v-container>
</template>

<script>
import ZSideBoard from './components/sideboard/Sideboard'
import ZMainBoard from './components/mainboard/Mainboard'
import ZModalForm from './components/form/ModalForm'
import ZViewer from './components/viewer/Viewer.vue'

export default {
  name: 'App',
  data () {
    return {
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
</style>
