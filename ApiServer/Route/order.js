const express = require('express')
const route = express.Router()
const OrderController = require('../Controller/OrderController')

route.get('/',OrderController.getOder)
route.get('/:id',OrderController.getIdorder)
route.put('/:id',OrderController.handlePay)

module.exports = route