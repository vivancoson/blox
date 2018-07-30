import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blockInWorkflow: [],
    currentBlock: {},
    modalFormOpen: false,
    sidePanelOpen: true,
    yamlViewerOpen: false,
  },
  mutations: {
    addBlockToWorkflow(state, newBlock) {
      state.blockInWorkflow.push(newBlock);
    },
    clearAllBlockInWorkflow(state) {
      state.blockInWorkflow = [];
    },
    removeBlockInWorkflow(state, block) {
      const index = state.blockInWorkflow.indexOf(block);
      state.blockInWorkflow.splice(index, 1);
    },
    removeBlockInWorkflowById(state, blockId) {
      state.blockInWorkflow.splice(blockId, 1);
    },
    changeCurrentBlockFields(state, payload) {
      const index = state.blockInWorkflow.indexOf(state.currentBlock);
      const block = state.blockInWorkflow[index];
      block.name = payload.name;
      for (const key in payload.fields) {
        if ({}.hasOwnProperty.call(payload.fields, key)) {
          block.fields[key] = payload.fields[key];
        }
      }
    },
    setCurrentBlock(state, block) {
      state.currentBlock = block;
    },
    switchModalFormOpen(state) {
      state.modalFormOpen = !state.modalFormOpen;
    },
    setModalFormOpen(state, boolean) {
      state.modalFormOpen = boolean;
    },
    switchsidePanelOpen(state) {
      state.sidePanelOpen = !state.sidePanelOpen;
    },
    switchViewerOpen(state) {
      state.yamlViewerOpen = !state.yamlViewerOpen;
    },
    setViewerOpen(state, boolean) {
      state.yamlViewerOpen = boolean;
    },
  },
});
