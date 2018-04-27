<template>
  <v-layout v-bind:style="{ left: block.positionX + 'px', top: block.positionY + 'px' }" class="sideboard-block elevation-10">
    <v-flex>
      <v-card v-bind:class="color">
        <v-card-title primary-title>
          <div>{{block.name}}</div>
          <span>{{block.clazz}}</span>
        </v-card-title>

        <div class="ep"></div>

        <v-card-actions>
          <v-btn icon @click.native="showConfig = !showConfig">
            <v-icon>{{ showConfig ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-on:click="selectBlock" small icon>
            <v-icon small dark>edit</v-icon>
          </v-btn>
          <v-btn v-on:click="removeBlock" small icon>
            <v-icon small dark>clear</v-icon>
          </v-btn>
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

import constants from '../../constants/constants'

export default {
  name: 'ZMainBlock',
  inject: ['stateService', 'workflowService', 'jsPlumbService'],
  data: () => ({
    showConfig: false
  }),
  computed: {
    color () {
      return constants.blockTypes[this.block.type].color
    }
  },
  methods: {
    removeBlock () {
      const currentWorkflow = this.stateService.currentWorkflow
      this.jsPlumbService.removeConnections(currentWorkflow, this.block)
      this.workflowService.removeBlockFromWorkflow(currentWorkflow, this.block)
    },
    selectBlock () {
      this.stateService.setCurrentBlock({})
      this.stateService.setCurrentBlock(this.block)
      this.stateService.setFormState(true)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.jsPlumbService.initiateBlock(this.stateService.currentWorkflow, this.block)
    })
  },
  props: ['block'],
  components: {}
}
</script>

<style scoped>

  .sideboard-block {
    position: absolute;
    color: #f4f1d0;
    width: 180px;
  }

  .block-input{
    background-color: #42928c;
  }

  .block-middleware{
    background-color: #b54a48;
  }
  .block-output{
    background-color: #80495e;
  }

  .ep {
    height: 25px;
    background-color: #3f3f3f;
  }

</style>
