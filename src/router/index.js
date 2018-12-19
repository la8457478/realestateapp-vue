import Vue from 'vue'
import Router from 'vue-router'
import main from '@/pages/main'
import pwd from '@/pages/pwd/pwd'
import reg from '@/pages/reg/reg'
import login from '@/pages/login/login'
import user from '@/pages/user/user'
import Vuex from 'vuex';

Vue.use(Vuex)
Vue.use(Router)
export default new Router({
  routes: [
    {
        path: '/main',
      name: 'main',
      component: main
    },
      {
          path: '/reg/reg',
          name: 'reg',
          component: reg
      },
      {
          path: '/login/login',
          name: 'login',
          component: login
      },
    {
      path: '/user/user',
      name: 'user',
      component: user
    }
  ]
})
