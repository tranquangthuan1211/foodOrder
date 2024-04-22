const express = require('express')
const route = express.Router()
const RegisterControler = require('../Controller/Register/register')

route.get('/',RegisterControler.index)
route.post('/',RegisterControler.handleRegister)
module.exports = route