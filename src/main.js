// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global from './assets/js/global'
import MuseUI from 'muse-ui';
import store from './store/index';
import 'muse-ui/dist/muse-ui.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Login from "./pages/login/login"
Vue.use(ElementUI);
Vue.use(MuseUI);
Vue.config.productionTip = false
Vue.prototype.global = global
/* eslint-disable no-new */
if(global.isApp){
  window.apiready = function () {
    new Vue({
      el: '#app',
      router,
        store,
      components: { App ,Login},
      template: '<App/>'
    })
  }
}else{
  new Vue({
    el: '#app',
    router,
      store,
    components: { App,Login },
    template: '<App/>'
  })
}
