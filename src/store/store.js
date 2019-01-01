import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function calculatePath(paths, blockList, up = true) {
  const result = {};
  if (paths) {
    paths.forEach((value) => {
      result[value] = value;
      const block = blockList[value];
      if (block) {
        const relations = calculatePath(up ? block.sources : block.targets, blockList, up);
        for (const relation in relations) {
          if ({}.hasOwnProperty.call(relations, relation)) {
            result[relation] = relation;
          }
        }
      }
    });
  }
  return result;
}


export default new Vuex.Store({
  state: {
    blockInWorkflow: [],
    blockInWorkflowAsMap: {},
    currentBlock: {},
    selectedBlockConnections: '',
    modalFormOpen: false,
    sidePanelOpen: true,
    yamlViewerOpen: false,
  },
  mutations: {
    addBlockToWorkflow(state, newBlock) {
      state.blockInWorkflow.push(newBlock);
      state.blockInWorkflowAsMap[newBlock.id] = newBlock;
    },
    clearAllBlockInWorkflow(state) {
      state.blockInWorkflow = [];
      state.blockInWorkflowAsMap = {};
    },
    addSourceToBlock(state, { source, target }) {
      const targetId = target.id;
      const sourceId = source.id;
      const block = state.blockInWorkflowAsMap[targetId];
      const sourceBlock = state.blockInWorkflowAsMap[sourceId];
      if (block) {
        block.sources.push(sourceId);
      }
      if (sourceBlock) {
        sourceBlock.targets.push(targetId);
      }
    },
    removeSourceFromBlock(state, { source, target }) {
      const targetId = target.id;
      const sourceId = source.id;
      const block = state.blockInWorkflowAsMap[targetId];
      const sourceBlock = state.blockInWorkflowAsMap[sourceId];
      if (block) {
        const sourceIndex = block.sources.indexOf(sourceId);
        if (sourceIndex !== -1) {
          block.sources.splice(sourceIndex, 1);
        }
      }
      if (sourceBlock) {
        const targetIndex = sourceBlock.targets.indexOf(targetId);
        if (targetId !== -1) {
          block.sources.splice(targetIndex, 1);
        }
      }
    },
    removeBlockInWorkflow(state, block) {
      const index = state.blockInWorkflow.indexOf(block);
      state.blockInWorkflow.splice(index, 1);
      delete state.blockInWorkflowAsMap[block.id];
    },
    removeBlockInWorkflowById(state, blockId) {
      state.blockInWorkflow.splice(blockId, 1);
      delete state.blockInWorkflowAsMap[blockId];
    },
    changeCurrentBlockFields(state, payload) {
      const index = state.blockInWorkflow.indexOf(state.currentBlock);
      const block = state.blockInWorkflow[index];
      block.name = payload.name;
      block.clazz = payload.clazz;
      for (const key in payload.fields) {
        if ({}.hasOwnProperty.call(payload.fields, key)) {
          block.fields[key] = payload.fields[key];
          if ({}.hasOwnProperty.call(payload.editables, key)) {
            block.editables[key] = payload.editables[key];
          }
        }
      }
    },
    setCurrentBlock(state, block) {
      state.currentBlock = block;
    },
    setSelectedBlockConnections(state, blockId) {
      if (state.selectedBlockConnections === blockId) {
        state.selectedBlockConnections = '';
      } else {
        state.selectedBlockConnections = blockId;
      }
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
    setShownBlocks(state, { id, sources, targets }) {
      let allConnections = {};
      const blocksList = state.blockInWorkflow;
      if (state.selectedBlockConnections) {
        const ancestors = calculatePath(sources, state.blockInWorkflowAsMap);
        const children = calculatePath(targets, state.blockInWorkflowAsMap, false);
        allConnections = { ...ancestors, ...children };
        allConnections[id] = id;
      }
      const allConnectionsLength = Object.keys(allConnections).length;
      blocksList.forEach((e) => {
        if (!allConnections[e.id] && allConnectionsLength) {
          e.filtered = true;
        } else {
          e.filtered = false;
        }
      });
    },
  },
});
