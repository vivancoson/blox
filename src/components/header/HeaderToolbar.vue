<template>
  <div>
    <v-toolbar class="header-toolbar" dense fixed app>
      <v-toolbar-side-icon @click.stop="switchDrawer"></v-toolbar-side-icon>
      <img src="../../assets/logo.png" class="main-logo-toolbar" alt="logo Edimus"/>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-divider vertical></v-divider>

        <v-btn
          flat
          @click="clearWorflow"
        >
          Clear Workflow
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn
          :disabled="displayLoader"
          :loading="displayLoader"
          @click="importYamlInput"
          flat
        >
          Import YAML file
        </v-btn>

        <v-divider vertical></v-divider>

        <input type="file" ref="fileElement" id="yaml-file-input" @change="importYaml" multiple hidden/>
      </v-toolbar-items>
    </v-toolbar>
    <v-dialog
      v-model="displayLoader"
      persistent
      width="300"
    >
      <v-card>
        <v-card-text>
          Loading...
          <v-progress-linear
            indeterminate
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="displaySnackbar"
      color="red darken-4"
      top
    >
      Unable to load file
      <v-btn
        @click="displaySnackbar = false"
        icon
        left
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import _ from 'lodash';
import Block from '../../models/block';

function getBlockType(word) {
  const wordSplit = word.split('.');
  return wordSplit[wordSplit.length - 3].toLowerCase();
}

export default {
  name: 'ZHeaderToolbar',
  inject: ['workflowService', 'uuidService', 'generatorService', 'stateService', 'jsPlumbService', 'fileService'],
  data() {
    return {
      displayLoader: false,
      displaySnackbar: false,
    };
  },
  methods: {
    switchDrawer() {
      this.stateService.setDrawerOpen(!this.stateService.currentNavigatorState.drawer);
    },

    clearWorflow() {
      this.stateService.currentWorkflow.clear();
      this.jsPlumbService.clearWorkflow(this.stateService.currentWorkflow);
    },
    importYamlInput() {
      this.$refs.fileElement.click();
    },

    importYaml(ev) {
      this.displayLoader = true;
      const { currentWorkflow } = this.stateService;
      const blockMap = {};
      let yamlToJson = '';
      const promises = this.fileService.readFiles(ev.target.files);
      Promise.all(promises).then((files) => {
        const mergedFiles = files.map(f => f.data).join('\n');
        const finalGrid = [];
        let levelArray = [];
        let positionX = 230;
        let positionY = 230;
        yamlToJson = this.generatorService.loadFromYaml(mergedFiles);
        _.forIn(yamlToJson, (value, key) => {
          if (getBlockType(value.class) === 'input') {
            value.name = key;
            levelArray.push(value);
            delete yamlToJson[key];
          }
        });
        finalGrid.push(levelArray);
        while (Object.keys(yamlToJson).length !== 0) {
          levelArray = [];
          finalGrid[finalGrid.length - 1].forEach((block) => {
            _.forIn(yamlToJson, (value, key) => {
              if (value.source.includes(block.name)) {
                value.name = key;
                levelArray.push(value);
                delete yamlToJson[key];
              }
            });
          });
          if (levelArray.length !== 0) {
            finalGrid.push(levelArray);
          }
        }
        finalGrid.forEach((blockColumn) => {
          blockColumn.forEach((value) => {
            const blockId = this.uuidService.uuid();
            const type = getBlockType(value.class);
            const block = new Block(blockId, value.name, type, value.class, value.config);
            block.setPosition(positionX, positionY);
            positionY += 200;
            blockMap[value.name] = {
              id: blockId,
              source: value.source,
            };
            this.workflowService.addBlockToWorkflow(currentWorkflow, block);
          });
          positionX += 250;
          positionY = 230;
        });
        this.$nextTick(() => {
          this.jsPlumbService.batch(currentWorkflow, () => {
            _.forIn(blockMap, (value) => {
              if (value.source) {
                value.source.forEach((e) => {
                  this.jsPlumbService.connect(currentWorkflow, blockMap[e].id, value.id);
                });
              }
            });
          });
          this.displayLoader = false;
        });
      }).catch(() => {
        this.displayLoader = false;
        this.displaySnackbar = true;
      });
    },
  },
};
</script>

<style scoped>
.header-toolbar {
  opacity: 0.7;
}
.main-logo-toolbar {
  height: 100%;
}
</style>
