const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String},
  image: {type: String},
  streetAddress: {type: String},
  postalCode: {type: String},
  city: {type: String},
  country: {type: String},
  phone: {type: String},
  admin: {type: Number, default: 0},
}, {timestamps: true});

module.exports = mongoose.model("Users",User)