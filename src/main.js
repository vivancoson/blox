import '@babel/polyfill';
import Vue from 'vue';
import 'vue2-ace-editor';
import 'brace/mode/json';
import 'brace/theme/twilight';
import 'brace/snippets/json';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

import './plugins/vuetify';
import './plugins/vue-drag-drop';
import App from './App.vue';
import store from './store/store';
import './registerServiceWorker';

import BlockService from './services/block_service';
import FileService from './services/file_service';
import GeneratorService from './services/generator_service';
import JsPlumbService from './services/jsplumb_service';
import UUIDService from './services/uuid_service';

Vue.config.productionTip = false;

new Vue({
  store,
  provide: {
    blockService: new BlockService(),
    fileService: new FileService(),
    generatorService: new GeneratorService(),
    jsPlumbService: new JsPlumbService(),
    uuidService: new UUIDService(),
  },
  render: h => h(App),
}).$mount('#app');
