var express = require('express');
var router = express.Router();
var userSchema = require('../models/users.js')

//检测是否登录
router.get('/checkedLogin',(req,res,next) => {
	console.log(req.cookies.userName)
	if(req.cookies.userName)
	{
		res.json({
			status:'0',
			msg:'已登录',
			result:req.cookies.userName
		})
	}
	else{
		res.json({
			status:'-1',
			msg:'未登录',
			result:''
		})
	}
})
//注册用户
router.post('/regist',(req,res,next) => {
	 let userName = req.body.userName
	 let userPwd = req.body.userPwd

	 console.log("degu")
	 userSchema.findOne({
	 	userName:userName
	 },(err,doc) => {
	 	if(doc){
	 		res.json({
	 			status:'0',
	 			msg:'用户名存在',
	 			exist:true
	 		})
	 	}
	 	else{
			let user = new userSchema({
				 	userName:userName,
				 	userPwd:userPwd
			})
			user.save((err) => {
			 	if(err){
			 		res.json({
			 			status:'1',
			 			msg:"保存失败"
			 		})
			 	}
			 	else{
			 		res.json({
			 			status:'0',
			 			msg:"保存成功",
			 		})
			 	}
	 		})
	 	}
	 })
	 
})

//登录
router.post('/login',(req,res,next) => {
	let userName = req.body.userName
	let userPwd = req.body.userPwd


	userSchema.findOne({
		userName:userName,
		userPwd:userPwd
	},(err,doc) => {
		if(err)
		{
			res.json({
			 			status:'1',
			 			msg:"查询失败"
			 		})
		}
		else
		{
			if(doc){
				res.cookie('userName',doc.userName,{
					path:'/',
					maxAge:1000*60*60
				})
				res.json({
					status:'0',
					msg:'登录成功',
					suc:true
				})
			}
			else{
				res.json({
					status:'0',
					msg:'登录失败',
					suc:false
				})
			}
		}
	})
})

//登出
router.post('/logout',(req,res,next) => {
	let userName = req.body.userName
	res.cookie('userName',userName,{
		path:'/',
		maxAge:-1
	})

	res.json({
		status:'0',
		msg:"登出成功",
		result:''
	})
})

//获取购物车中商品数据
router.get('/cartList',(req,res,next) => {
	let userName = req.cookies.userName

	userSchema.findOne({userName:userName},(err,doc) => {
		if(err){
			res.json({
				status:'-1',
				msg:'获取错误',
				result:''
			})
		}
		else{
			if(doc){
				res.json({
					status:'0',
					msg:'获取成功',
					result:doc.cartList
				})
			}
			else{
				res.json({
					status:'-1',
					msg:'获取错误',
					result:''
				})
			}
			
		}
	})
})

//增减商品数量
router.post('/opreateCart',(req,res,next) => {
	let type = req.body.type
	let userName = req.cookies.userName
	let productNumber = req.body.productNumber
	let productId = req.body.productId

	console.log(productNumber)
	userSchema.update({'userName':userName,'cartList.productId':productId},{
		'cartList.$.productNumber':productNumber
	},(err,doc) => {
		if(err){
			res.json({
				status:'-1',
				msg:'增减失败',
				result:''
			})
		}
		else{
			console.log(doc)
			res.json({
				status:'0',
				msg:'增减成功',
				result:''
			})
		}
	})
})

//删除商品
router.post('/deleteGoods',(req,res,next) => {
	let userName = req.cookies.userName
	let productId = req.body.productId

	userSchema.update({userName:userName},{
		$pull:{
			'cartList':{
				productId:productId
			}
		}
	},(err,doc) => {
		if(err){
			res.json({
				status:'-1',
				msg:'删除失败',
				result:''
			})
		}
		else{
			res.json({
				status:'0',
				msg:'删除成功',
				result:doc.cartList
			})
		}
	})
})

router.post('/ischecked',(req,res,next) => {
	let checked = req.body.checked
	let userName = req.cookies.userName
	let productId = req.body.productId

	userSchema.update({'userName':userName,'cartList.productId':productId},{
		'cartList.$.checked':checked
	},(err,doc) => {
		if(err){
			res.json({
				status:'-1',
				msg:'选中失败',
				result:''
			})
		}
		else{
			console.log(doc)
			res.json({
				status:'0',
				msg:'选中成功',
				result:''
			})
		}
	})

})

router.post('/checkALL',(req,res,next) => {
	let checked = req.body.checked
	let userName = req.cookies.userName

	userSchema.findOne({userName:userName},(err,doc) => {
		if(err){
			res.json({
				status:'-1',
				msg:'全选中失败',
				result:''
			})
		}
		else if(checked){
			doc.cartList.forEach((item) => {
				item.checked = 1
			})
			res.json({
				status:'0',
				msg:'全选中成功',
				result:''
			})
		}
		else{
			doc.cartList.forEach((item) => {
				item.checked = 0
			})
			res.json({
				status:'0',
				msg:'全不选中成功',
				result:''
			})
		}
		doc.save()

		
	})
	
	
})



module.exports = router;
