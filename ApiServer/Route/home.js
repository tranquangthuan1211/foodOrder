const express = require('express')
const route = express.Router();
const HomeController = require('../Controller/HomeController')

route.post('/',HomeController.getUser)

module.exports = route