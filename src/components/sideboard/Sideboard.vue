<template>
  <v-navigation-drawer
    v-model="sidePanelOpen"
    hide-overlay
    stateless
    width="200"
    app>
    <v-layout
      row
      align-center>
      <v-text-field
        v-model="searchInput"
        placeholder="Rechercher..."
        single-line
        append-icon="search"
        class="px-2 py-1"
        hide-details/>
    </v-layout>
    <div class="sideboard">
      <z-custom-block/>
      <z-sideboard-block
        v-for="block in filteredBlockList"
        :key="block.name"
        :def="block"/>
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
