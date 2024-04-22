const express = require('express')
const route = express.Router()
const LoginController = require('../Controller/LoginController/login.js')
route.get('/',LoginController.getAdmin)
route.post('/',LoginController.handleLogin)

module.exports = route