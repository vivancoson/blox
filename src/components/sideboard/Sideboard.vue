<template>
  <div class="sideboard row">
    <z-side-block v-bind:key="def.name" v-for="def in defs" v-bind:def="def"></z-side-block>
  </div>
</template>

<script>

import ZSideBlock from './SideboardBlock'

export default {
  name: 'ZSideboard',
  inject: ['blockService'],
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
