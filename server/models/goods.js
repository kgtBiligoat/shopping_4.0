let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productShcema = new Schema({
	"productId":String,
	"productName":String,
	"salePrice":Number,
	"productImg":String,
	"productNumber":Number,
	"checked":Number
});

module.exports = mongoose.model('Good',productShcema);