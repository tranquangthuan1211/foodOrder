const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItem = new Schema({
  image: {type: String},
  name: {type: String},
  description: {type: String},
  category: {type: mongoose.Types.ObjectId},
  basePrice: {type: Number},
  sizes: {type:[ExtraPriceSchema]},
  extraIngredientPrices: {type:[ExtraPriceSchema]},
}, {timestamps: true});

module.exports = mongoose.model("MenuItem",MenuItem)