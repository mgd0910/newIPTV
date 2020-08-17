import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import auth from './modules/auth'
import index from './modules/index'
import component from './modules/component'
Vue.use(Vuex)
const store=new Vuex.Store({
 actions,
 modules:{
     auth,
     index,
     component
 },

})
export default store