<template>
  <v-container id="app">
    <v-layout row wrap>
      <v-flex xs2>
        <z-side-board></z-side-board>
      </v-flex>
      <v-flex xs10>
        <z-main-board></z-main-board>
      </v-flex>
    </v-layout>
    <z-modal-form></z-modal-form>
  </v-container>
</template>

<script>
import ZSideBoard from './components/sideboard/Sideboard'
import ZMainBoard from './components/mainboard/Mainboard'
import ZModalForm from './components/form/ModalForm'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    ZSideBoard,
    ZMainBoard,
    ZModalForm
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
