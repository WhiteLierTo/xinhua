import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'default-passive-events'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/init.css'

let EleConfig = {size: 'small'};

Vue.use(ElementUI, EleConfig);

Vue.config.productionTip = false;

import $ajax from "./service"
import $utils from "./utils"

Vue.prototype.$utils = $utils;
Vue.prototype.$ajax = $ajax;

import {MessageBox} from 'element-ui'

Vue.prototype.$confirm = MessageBox.confirm;

Vue.prototype.$config = {
  dedug: true,
};

Vue.use($utils.componentsRegister);

Array.prototype.remove = function (item) {
  let index = this.indexOf(item);
  if (index === -1) return this;
  this.splice(index, 1);
  return this
};

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
