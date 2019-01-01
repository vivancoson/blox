<template>
  <div>
    <v-bottom-sheet
      v-model="yamlViewerOpen"
      hide-overlay
      inset>
      <v-card class="yaml-viewer">
        <div class="yaml-viewer-toolbar">
          <v-btn
            icon
            @click="copyToClipboard">
            <v-icon>content_copy</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="downloadYaml">
            <v-icon>save</v-icon>
          </v-btn>
        </div>
      </v-card>
      <code
        id="yaml-text"
        v-html="yamlForHTML"/>
    </v-bottom-sheet>

    <v-layout justify-end>
      <v-btn
        id="yaml-viewer-toggle-button"
        :disabled="yamlForHTML.length === 0"
        @click="switchViewerOpen">
        <span>{{ yamlViewerOpen ? 'hide yaml' : 'view yaml' }}</span>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'ZViewer',
  inject: ['generatorService', 'jsPlumbService', 'fileService'],
  data() {
    return {
      generatedYaml: '',
    };
  },
  computed: {
    yamlForHTML() {
      this.generateYaml();
      return this.generatorService.generateYamlViewerHTML(this.generatedYaml);
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
      if (this.generatedYaml === '') {
        this.setViewerOpen(false);
      }
    },
  },
  created() {
    this.jsPlumbService.listenToConnectionChanges(() => { this.generatedYaml = this.generateYaml(); });
  },
  methods: {
    copyToClipboard() {
      window.getSelection().selectAllChildren(document.getElementById('yaml-text'));
      document.execCommand('copy');
    },
    generateYaml() {
      this.generatedYaml = this.generatorService.generate(
        this.blockInWorkflow,
        this.jsPlumbService.getAllConnections(),
      );
    },
    async downloadYaml() {
      const filename = 'workflow.zip';
      const workflowName = 'workflow.yaml';
      const content = await this.fileService.makeArchive(workflowName, this.generatedYaml, this.blockInWorkflow);
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(content, filename);
      } else {
        const a = document.createElement('a');
        const url = URL.createObjectURL(content);
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
