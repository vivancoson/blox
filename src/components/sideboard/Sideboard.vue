<template>
  <v-navigation-drawer hide-overlay stateless width="200" v-model="sidePanelOpen" app>
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
import ZSideboardBlock from './SideboardBlock.vue';
import ZCustomBlock from './CustomBlock.vue';

export default {
  name: 'ZSideboard',
  components: { ZSideboardBlock, ZCustomBlock },
  inject: ['blockService'],
  data() {
    return {
      blockList: [],
      searchInput: '',
    };
  },
  computed: {
    filteredBlockList() {
      return this.blockList.filter(e => e.name.toLowerCase().includes(this.searchInput.toLowerCase()));
    },
    sidePanelOpen: {
      get() {
        return this.$store.state.sidePanelOpen;
      },
      set() {},
    },
  },
  created() {
    this.blockService.getDefinitions().then((res) => { this.blockList = res; });
  },
};
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
