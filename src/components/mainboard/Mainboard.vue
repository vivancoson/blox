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
import ZMainBlock from './MainboardBlock.vue';
import Block from '../../models/block';

export default {
  name: 'ZMainBoard',
  inject: ['uuidService', 'jsPlumbService', 'blockService'],
  components: { ZMainBlock },
  computed: mapState([
    'blockInWorkflow',
  ]),
  methods: {
    handleDrop(data, event) {
      if (data) {
        const { def } = data;
        const block = new Block(this.uuidService.uuid(), `${def.name}Block`, def.type, def.clazz, _.cloneDeep(def.config), def.details, def.suggestions);
        block.setPosition(event.offsetX - 90, event.offsetY - 75);
        this.addBlockToWorkflow(block);
      }
    },
    ...mapMutations([
      'addBlockToWorkflow',
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
