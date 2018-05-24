<template>
  <v-navigation-drawer hide-overlay stateless width="200" v-model="navigator.drawer" app>
    <v-layout row align-center>
      <v-text-field placeholder="Rechercher..." single-line append-icon="search" v-model="searchInput" class="px-2 py-1" hide-details></v-text-field>
    </v-layout>

    <div class="sideboard">
      <z-custom-block></z-custom-block>
      <z-sideboard-block v-bind:key="block.name" v-for="block in filteredBlockList" v-bind:def="block"></z-sideboard-block>
    </div>
  </v-navigation-drawer>
</template>

<script>
import ZSideboardBlock from './SideboardBlock'
import ZCustomBlock from './CustomBlock'

export default {
  name: 'ZSideboard',
  inject: ['blockService', 'stateService'],
  data () {
    return {
      blockList: [],
      navigator: this.stateService.currentNavigatorState,
      searchInput: ''
    }
  },
  computed: {
    filteredBlockList () {
      return this.blockList.filter(e => {
        return e.name.toLowerCase().includes(this.searchInput.toLowerCase())
      })
    }
  },
  created () {
    this.blockService.getDefinitions().then(res => { this.blockList = res })
  },
  components: {ZSideboardBlock, ZCustomBlock}
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 1px;
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #f4f1d0;
}
</style>
