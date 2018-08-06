<template>
  <drop
    id="container"
    class="drop mainboard"
    @drop="handleDrop"
  >
    <z-main-block
      v-for="block in blockInWorkflow"
      :id="block.id"
      :key="block.id"
      :block="block"
    />
  </drop>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import _ from 'lodash';
import constants from '../../constants/constants';
import ZMainBlock from './MainboardBlock.vue';
import Block from '../../models/block';

export default {
  name: 'ZMainBoard',
  inject: ['uuidService', 'jsPlumbService', 'blockService'],
  components: { ZMainBlock },
  computed: mapState([
    'blockInWorkflow',
  ]),
  created() {
    this.jsPlumbService.listenToConnectionChanges((info, eventType) => {
      if (eventType === constants.connectionEvents.attached) {
        this.addSourceToBlock(info);
      } else if (eventType === constants.connectionEvents.detached) {
        this.removeSourceFromBlock(info);
      } else {
        this.removeSourceFromBlock({
          source: { id: info.originalSourceId },
          target: { id: info.originalTargetId },
        });
      }
    });
  },
  methods: {
    handleDrop(data, event) {
      if (data) {
        const { def } = data;
        const id = this.uuidService.uuid();
        const name = `${def.name}_${id.substring(30)}`;
        const block = new Block(id, name, def.type, def.clazz, _.cloneDeep(def.config), def.details, def.suggestions);
        block.setPosition(event.offsetX - 90, event.offsetY - 75);
        this.addBlockToWorkflow(block);
      }
    },
    ...mapMutations([
      'addBlockToWorkflow',
      'addSourceToBlock',
      'removeSourceFromBlock',
    ]),
  },
};
</script>

<style scoped>
.mainboard {
  height: 1000vh;
  width: 1000vw;
  position: relative;
  background: #303030 url("../../assets/dark-wood.png") repeat;
}
</style>
