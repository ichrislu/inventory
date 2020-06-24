import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)

const store = {
	loginDate : [
		{Username : 'admin',Password : '123456'},
		{Username : 'root',Password : 'root'},
	]
}

export default new Vuex.Store({
	store
})
