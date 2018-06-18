import Vue from 'vue'
import Router from 'vue-router'
import goodList from '../view/goodList'
import cart from '../view/cart'
import checkout from '../view/checkout'


Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path:"/",
  		name:"goodList",
  		component:goodList
  	},
  	{
  		path:"/cart",
  		name:"cart",
  		component:cart
  	},
    {
      path:'/checkout',
      name:'checkout',
      component:checkout
    }

  ],
  mode:'history'
})
