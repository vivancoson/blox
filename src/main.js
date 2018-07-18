import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import './plugins/vue-drag-drop';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';

import BlockService from './services/block_service';
import WorkflowService from './services/workflow_service';
import GeneratorService from './services/generator_service';
import UUIDService from './services/uuid_service';
import NameService from './services/name_service';
import StateService from './services/state_service';
import JsPlumbService from './services/jsplumb_service';
import FileService from './services/file_service';

Vue.config.productionTip = false;

new Vue({
  store,
  provide: {
    blockService: new BlockService(),
    workflowService: new WorkflowService(),
    generatorService: new GeneratorService(),
    uuidService: new UUIDService(),
    nameService: new NameService(),
    stateService: new StateService(),
    jsPlumbService: new JsPlumbService(),
    fileService: new FileService(),
  },
  render: h => h(App),
}).$mount('#app');
