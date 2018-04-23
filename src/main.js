// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import VueDragDrop from 'vue-drag-drop'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App'
import BlockService from './services/block_service'
import WorkflowService from './services/workflow_service'
import GeneratorService from './services/generator_service'
import UUIDService from './services/uuid_service'
import NameService from './services/name_service'
import StateService from './services/state_service'
import JsPlumbService from './services/jsplumb_service'

Vue.config.productionTip = false
Vue.use(AsyncComputed)
Vue.use(VueDragDrop)
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  provide: {
    blockService: new BlockService(),
    workflowService: new WorkflowService(),
    generatorService: new GeneratorService(),
    uuidService: new UUIDService(),
    nameService: new NameService(),
    stateService: new StateService(),
    jsPlumbService: new JsPlumbService()
  }
})
