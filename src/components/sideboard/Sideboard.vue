<template>
  <v-navigation-drawer hide-overlay stateless v-model="navigator.drawer" app>
    <v-layout row align-center style="max-width: 650px">
      <v-text-field
        placeholder="Search..."
        single-line
        append-icon="search"
        color="white"
        v-model="searchInput"
        hide-details
      ></v-text-field>
    </v-layout>
    <div class="sideboard">
      <z-side-block v-bind:key="def.name" v-for="def in definitions" v-bind:def="def"></z-side-block>
    </div>
  </v-navigation-drawer>
</template>

<script>

import ZSideBlock from './SideboardBlock'

export default {
  name: 'ZSideboard',
  inject: ['blockService', 'stateService'],
  data () {
    return {
      navigator: this.stateService.currentNavigatorState,
      searchInput: ''
    }
  },
  computed: {
    definitions () {
      return this.defs.filter(e => {
        return e.name.includes(this.searchInput)
      })
    }
  },
  asyncComputed: {
    defs: {
      get () {
        return this.blockService.getDefinitions()
      },
      default: []
    }
  },
  components: {ZSideBlock}
}
</script>

<style scoped>
</style>
