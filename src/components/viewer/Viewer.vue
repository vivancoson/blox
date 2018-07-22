<template>
  <div>
    <v-bottom-sheet hide-overlay inset v-model="yamlViewerOpen">
      <v-card class="yaml-viewer">
        <div class="yaml-viewer-toolbar">
          <v-btn @click="copyToClipboard" icon>
            <v-icon>content_copy</v-icon>
          </v-btn>
          <v-btn @click="downloadYaml" icon>
            <v-icon>save_alt</v-icon>
          </v-btn>
        </div>
      </v-card>
      <code id="yaml-text" v-html="yamlForHTML"></code>
    </v-bottom-sheet>

    <v-layout justify-end>
      <v-btn id="yaml-viewer-toggle-button" @click="switchViewerOpen" :disabled="yamlForHTML.length === 0">
        <span>{{yamlViewerOpen ? 'hide yaml' : 'view yaml'}}</span>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'ZViewer',
  inject: ['generatorService', 'jsPlumbService'],
  computed: {
    yamlForHTML() {
      return this.generatorService.generateYamlViewerHTML(this.generateYaml());
    },
    yamlViewerOpen: {
      get() {
        return this.$store.state.yamlViewerOpen;
      },
      set() {
        this.setViewerOpen(false);
      },
    },
    ...mapState([
      'blockInWorkflow',
    ]),
  },
  watch: {
    yamlForHTML() {
      if (this.yamlForHTML === '') {
        this.setViewerOpen(false);
      }
    },
  },
  methods: {
    copyToClipboard() {
      window.getSelection().selectAllChildren(document.getElementById('yaml-text'));
      document.execCommand('copy');
    },
    generateYaml() {
      return this.generatorService.generate(
        this.blockInWorkflow,
        this.jsPlumbService.getAllConnections(),
      );
    },
    downloadYaml() {
      const filename = 'workflow.yaml';
      const file = new Blob([this.generateYaml()], { type: 'application/x-yaml;charset=utf-8' });

      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
      } else {
        const a = document.createElement('a');
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
    ...mapMutations([
      'switchViewerOpen',
      'setViewerOpen',
    ]),
  },
  created() {
    this.jsPlumbService.listenToConnectionChanges(() => this.generateYaml());
  },
};
</script>

<style scoped>
#yaml-viewer-toggle-button {
  position: fixed;
  bottom: 0;
  right: 0;
}
.yaml-viewer-toolbar {
  position: absolute;
  right: 0;
}
code {
  padding: 10px;
  overflow: auto;
  background-color: #252525;
  width: 100%;
  max-height: 500px;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background: #42928c;
}
</style>
