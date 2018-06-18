import Vue from 'vue'
import router from './router'
import VueLazy from 'vue-lazyload'
import Vueloading from 'vue-infinite-scroll'
import store from './store/store'

import './assets/css/base.css'
import './assets/css/login.css'
import './assets/css/checkout.css'
import './assets/css/product.css'

Vue.config.productionTip = false
Vue.use(VueLazy,{
	loading:'/static/loading-svg/loading-bars.svg'
})
Vue.use(Vueloading)


new Vue({
	el: '#app',
	router,
  	store,
	template:
		`<div id="app">
		    <router-view></router-view>
    	</div>`	
})
