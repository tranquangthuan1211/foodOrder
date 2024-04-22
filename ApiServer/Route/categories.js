const express = require('express');
const route = express.Router();
const CategoriesController = require('../Controller/CategoriesController')
route.get('/',CategoriesController.getCategories)
route.delete('/:id',CategoriesController.deleteCategories)
route.put('/update',CategoriesController.updateCategories)
route.post('/',CategoriesController.createCategories)
module.exports = route