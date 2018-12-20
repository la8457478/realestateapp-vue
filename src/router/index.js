import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/main/index'
import reg from '@/pages/reg/reg'
import user from '@/pages/user/user'
import Vuex from 'vuex';

Vue.use(Vuex)
Vue.use(Router)
export default new Router({
  routes: [
    {
        path: '/main/index',
      name: 'index',
      component: index
    },
      {
          path: '/reg/reg',
          name: 'reg',
          component: reg
      },
    {
      path: '/user/user',
      name: 'user',
      component: user
    }
  ]
})
