import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getter from './getter'

export default new Vuex.Store({
  state,
  getter,
  mutations,
  actions
})