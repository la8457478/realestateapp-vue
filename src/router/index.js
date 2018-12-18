import Vue from 'vue'
import Router from 'vue-router'
import main from '@/pages/main/main'
import pwd from '@/pages/pwd/pwd'
import reg from '@/pages/reg/reg'
import user from '@/pages/user/user'
import Vuex from 'vuex';

Vue.use(Vuex)
Vue.use(Router)

export const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: ""
    },
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        }
    }
})

export default new Router({
  routes: [
    {
      path: '/main/main',
      name: 'main',
      component: main
    },
    {
      path: '/pwd/pwd',
      name: 'other',
      component: pwd
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
