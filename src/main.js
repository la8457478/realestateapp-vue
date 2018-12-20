// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import router from 'vue-router'
import global from './assets/js/global'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

import store from './store/index';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Login from "./pages/login/login"
Vue.use(ElementUI);
Vue.use(MuseUI);
Vue.config.productionTip = false
Vue.prototype.global = global
/* eslint-disable no-new */
// if(global.isApp){
//   window.apiready = function () {
//     new Vue({
//       el: '#app',
//       router,
//         store,
//       components: { App },
//       template: '<App/>'
//     })
//   }
// }else{
//   new Vue({
//     el: '#app',
//     router,
//       store,
//     components: { App},
//     template: '<App/>'
//   })
// }
Vue.use(router)

export default {
    init(component) {
        routes.push({
            path: location.pathname,
            component
        })

        const router = new VueRouter({
            mode: config.vueRouterMode,
            routes
        })

        new Vue({
            router,
            store,
            template: '<App/>',
            components: {App},
            created(){
                if(router.mode === 'hash' && !location.hash) {
                    this.$router.push(location.pathname)
                }
            }
        }).$mount('#app')
    }
}