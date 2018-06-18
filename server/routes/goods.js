var express = require('express');
var router = express.Router();
var GoodsModel = require('../models/goods.js');


//商品列表渲染
router.get('/',(req,res,next) => {
	let sort = parseInt(req.param('sort'))
	let page = parseInt(req.param('page'))
	let pageSize = parseInt(req.param('pageSize') )
	let priceLevel = req.param('priceChecked')
	
	let skip = (page - 1) * pageSize

	if(priceLevel != 'All')
	{
		var startPrice,endPrice
		switch(priceLevel)
		{
			case '0':
				startPrice = 0;
				endPrice = 100;
				break;
			case '1':
				startPrice = 100;
				endPrice = 500;
				break;
			case '2':
				startPrice = 500;
				endPrice = 1000;
				break;
			case '3':
				startPrice = 1000;
				endPrice = 5000;
				break;
		}
	}
	else
	{
		startPrice = 0
		endPrice = 10000
	}
	let toFind = {
		salePrice:{
			$gt:startPrice,
			$lte:endPrice
		}
	}
	let goodModel = GoodsModel.find(toFind).skip(skip).limit(pageSize)
	goodModel.sort({'salePrice':sort})
	goodModel.exec({},(err,doc) => {
		if(err)
		{
			res.json({
				status:'1',
				msg:err.message
			})
		}
		else
		{
			res.json({
				status:'0',
				msg:'',
				result:{
					listLength:doc.length,
					list:doc
				}
			})
		}
	})
})

//购物车添加渲染
router.post('/addCart', (req,res,next) => {
	let userModel = require('../models/users.js')
	var productId = req.body.productId
	var checked = req.body.checked
	let userName = req.cookies.userName

	userModel.findOne({userName:userName},(err,userDoc) => {
		if(err){
			res.json({
				status:'1',
				msg:err,
				result:''
			})
		}
	
		GoodsModel.findOne({productId:productId},(err,doc) => {

		
			if(err){
				res.json({
					status:'1',
					msg:err,
					result:''
				})
			}
			if(doc){
				let item2 = ''
				userDoc.cartList.forEach((item) => {
					if(item.productId == productId){
						item2 = item
						item.productNumber++
					}
				
				})	
				if(item2){
					userDoc.save((err) => {
						if(err){
							res.json({
								status:'1',
								msg:err,
								result:''
							})
						}
						else{
							res.json({
								status:'0',
								msg:'添加成功',
								result:''
							})
						}

					})
				}
				else{
					doc.checked = checked
					doc.productNumber = 1
					userDoc.cartList.push(doc)
					userDoc.save((err) => {
						if(err){
							res.json({
								status:'1',
								msg:err,
								result:''
							})
						}
						else{
							res.json({
								status:'0',
								msg:'添加成功',
								result:''
							})
						}

					})
				}
				
			}
			else{
				res.json({
							status:'1',
							msg:"err",
							result:''
						})
			}

		})
	})
})

module.exports = router

