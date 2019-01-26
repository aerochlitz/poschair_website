import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all.js'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import App from './App.vue';
import store from './services/store';

Vue.config.productionTip = false;

export default new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
