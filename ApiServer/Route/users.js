const express = require('express')
const route = express.Router()
const UserController = require('../Controller/UserController')

route.get('/',UserController.getUser)

module.exports = route