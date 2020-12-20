import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from './modules/cartModule'
import storeItemsModule from './modules/storeItemsModule'
import checkoutModule from './modules/checkoutModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cartModule,
    checkoutModule,
    storeItemsModule
  }
})
