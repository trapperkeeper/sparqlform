import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

var _ = require('lodash');

// replace all occurences in string
String.prototype.replaceAll = function (f, r) { return this.split(f).join(r); };

// Adding items of array to mySet
Set.prototype.addItems = function(array) {
  for (var item of array) {
    this.add(item)
  }
};

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
