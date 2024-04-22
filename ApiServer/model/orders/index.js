const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cart = new Schema({
  name:{type: String},
  image:{type: String},
  price:{type:Number},
  quantity:{type:Number}
})
const Order = new Schema({
  userEmail: String,
  phone: String,
  streetAddress: String,
  postalCode: String,
  city: String,
  country: String,
  cartProducts: [cart],
  paid: {type: Number, default: 0},
}, {timestamps: true});

module.exports = mongoose.model('Order', Order);