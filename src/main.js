// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'

import App from './App'
import BlocService from './services/block_service'

Vue.config.productionTip = false
Vue.use(AsyncComputed)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  provide: {
    blocService: new BlocService()
  }
})
