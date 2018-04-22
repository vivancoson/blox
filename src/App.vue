<template>
  <div id="app">
    <img src="./assets/logo.png">
    <side-board-block></side-board-block>
  </div>
</template>

<script>
import SideBoardBlock from './components/sideboard/SideboardBlock'

import 'materialize-css/dist/css/materialize.css'
import 'materialize-css'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    SideBoardBlock
  }
}
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
