const express = require('express')
const route = express.Router()
const MenuController = require('../Controller/MenuController/index')
route.get('/', MenuController.getItem)
route.put('/', MenuController.update)
route.post('/',MenuController.createMenu)
route.delete('/:id', MenuController.deleteMenu)

module.exports = route;