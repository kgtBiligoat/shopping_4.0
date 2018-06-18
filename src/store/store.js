import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
   	loginTip:false
  },
  mutations:{
  	login(state){
  		state.loginTip = true
  	},
  	logout(state){
  		state.loginTip = false
  	}
  }
})

export default store