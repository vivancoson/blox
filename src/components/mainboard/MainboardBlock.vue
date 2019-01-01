<template>
  <v-layout
    v-show="!block.filtered"
    :style="blockPosition"
    class="mainboard-block elevation-10">
    <v-flex>
      <v-card
        :class="color"
        class="mainboard-block--size"
        @drop="alert(1)">
        <v-card-title>
          <div
            :title="block.name"
            class="body-2 mainboard-block--text">{{ block.name }}</div>
          <span
            :title="getClassName"
            class="body-1 mainboard-block--text">{{ getClassName }}</span>
        </v-card-title>

        <div class="ep"/>

        <v-card-actions>
          <v-tooltip bottom>
            <v-btn
              slot="activator"
              icon
              @click="showConfig = !showConfig">
              <v-icon large>{{ showConfig ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
            <span>{{ showConfig ? 'Réduire' : 'Détails' }}</span>
          </v-tooltip>
          <v-spacer/>
          <v-tooltip bottom>
            <v-btn
              slot="activator"
              icon
              @click="selectBlock">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>Modifier</span>
          </v-tooltip>
          <v-spacer/>
          <v-tooltip bottom>
            <v-btn
              slot="activator"
              icon
              @click="removeBlock">
              <v-icon medium>clear</v-icon>
            </v-btn>
            <span>Supprimer</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn
              slot="activator"
              icon
              @click="showConnections">
              <v-icon
                v-show="selectedBlockConnections === block.id"
                medium>turned_in</v-icon>
              <v-icon
                v-show="selectedBlockConnections !== block.id"
                medium>turned_in_not</v-icon>
            </v-btn>
            <span>Liaisons</span>
          </v-tooltip>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="showConfig">
            <div
              v-for="(value, key) in block.fields"
              :key="key">
              <span v-once>{{ key }} : </span> <span>{{ value }}</span>
            </div>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import constants from '../../constants/constants';

export default {
  name: 'ZMainBlock',
  inject: ['jsPlumbService', 'blockService'],
  props: {
    block: {
      type: Object,
      default() {
        return {
          name: 'DefautBlockValue',
        };
      },
    },
  },
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
      if (this.block.clazz) {
        return this.block.clazz.split('.').pop();
      }
      return 'no-class-found';
    },
    ...mapState([
      'selectedBlockConnections',
      'blockInWorkflow',
    ]),
  },
  beforeMount() {
    this.setBlockPosition(this.block.positionX, this.block.positionY);
  },
  mounted() {
    this.$nextTick(() => {
      this.jsPlumbService.initiateBlock(this.block, ({ pos }) => {
        this.block.setPosition(pos[0], pos[1]);
      });
    });
  },
  methods: {
    removeBlock() {
      this.jsPlumbService.removeConnections(this.block);
      this.removeBlockInWorkflow(this.block);
    },
    selectBlock() {
      this.setCurrentBlock(this.block);
      this.setModalFormOpen(true);
    },
    setBlockPosition(left, top) {
      this.blockPosition.left = `${left}px`;
      this.blockPosition.top = `${top}px`;
    },
    showConnections() {
      this.setSelectedBlockConnections(this.block.id);
      this.setShownBlocks(this.block);
      this.$nextTick(() => {
        if (this.selectedBlockConnections) {
          this.jsPlumbService.removeFilteredConnections(this.blockInWorkflow);
        } else {
          this.jsPlumbService.showAllConnections();
        }
      });
    },
    ...mapMutations([
      'removeBlockInWorkflow',
      'setCurrentBlock',
      'setModalFormOpen',
      'setSelectedBlockConnections',
      'setShownBlocks',
    ]),
  },
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
