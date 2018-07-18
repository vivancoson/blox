<template>
  <v-layout :style="blockPosition" class="mainboard-block elevation-10">
    <v-flex>
      <v-card :class="color" class="mainboard-block--size">
        <v-card-title>
          <div class="body-2 mainboard-block--text" :title=block.name>{{block.name}}</div>
          <span class="body-1 mainboard-block--text" :title=getClassName>{{getClassName}}</span>
        </v-card-title>

        <div class="ep"></div>

        <v-card-actions>
          <v-tooltip bottom>
            <v-btn icon v-on:click="showConfig = !showConfig" slot="activator">
              <v-icon large>{{ showConfig ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
            <span>{{ showConfig ? 'Réduire' : 'Détails' }}</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <v-btn v-on:click="selectBlock" icon slot="activator">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>Modifier</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <v-btn v-on:click="removeBlock" icon slot="activator">
              <v-icon medium>clear</v-icon>
            </v-btn>
            <span>Supprimer</span>
          </v-tooltip>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="showConfig">
            <div v-for="(value, key) in block.fields" v-bind:key="key">
              <span v-once>{{key}} : </span> <span>{{value}}</span>
            </div>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import constants from '../../constants/constants';

export default {
  name: 'ZMainBlock',
  inject: ['stateService', 'workflowService', 'jsPlumbService'],
  data: () => ({
    showConfig: false,
    blockPosition: {
      left: '0px',
      top: '0px',
    },
  }),
  computed: {
    color() {
      return constants.blockTypes[this.block.type].color;
    },
    getClassName() {
      return this.block.clazz.split('.').pop();
    },
  },
  methods: {
    removeBlock() {
      const currentWorkflow = this.stateService.currentWorkflow;
      this.jsPlumbService.removeConnections(currentWorkflow, this.block);
      this.workflowService.removeBlockFromWorkflow(currentWorkflow, this.block);
    },
    selectBlock() {
      this.stateService.setCurrentBlock({});
      this.stateService.setCurrentBlock(this.block);
      this.stateService.setFormState(true);
    },
    setBlockPosition(left, top) {
      this.blockPosition.left = `${left}px`;
      this.blockPosition.top = `${top}px`;
    },
  },
  beforeMount() {
    this.setBlockPosition(this.block.positionX, this.block.positionY);
  },
  mounted() {
    this.$nextTick(() => {
      this.jsPlumbService.initiateBlock(this.stateService.currentWorkflow, this.block, ({ pos }) => {
        this.block.setPosition(pos[0], pos[1]);
      });
    });
  },
  props: ['block'],
  components: {},
};
</script>

<style scoped>
.mainboard-block {
  position: absolute;
}
.mainboard-block--size {
  width: 180px;
  height: 150px;
}
.mainboard-block--text {
  width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.block-input {
  background-color: #42928c;
}
.block-middleware {
  background-color: #b54a48;
}
.block-output {
  background-color: #80495e;
}
.ep {
  height: 30px;
  border: 1px solid #f4f1d0;
  margin: -8px 14px 0px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
}
.ep:active {
  border: double;
  background-color: #30303057;
}
</style>
