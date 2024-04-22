const menuItem = require('../../model/menu')
const mongoose = require('mongoose')
class MenuController {
    async getItem(req,res) {
        await menuItem.find({})
        .then((item) => res.status(200).json(item))
        .catch((error) => res.status(500).json(error))
    }
    update(req, res) {
        console.log(req.body.category)
        req.body.category = new mongoose.Types.ObjectId(req.body.category? req.body.category:'661cf412be42e6d13bdbae2c');
        // const data = {
        //     _id: '66201e4785ff5973562cf516',
        //     category:  objectIdFromString ,
        //     image: '',
        //     name: 'Pepperoni Pizza',
        //     description: 'Classic pepperoni pizza with tomato sauce and mozzarella cheese.',
        //     basePrice: 8,
        //     sizes: [
        //       { name: 'Large', price: 3.5, _id: '662022b199658327ab53a652' },
        //       { name: 'Medium', price: 2.5, _id: '662022b199658327ab53a653' },
        //       { name: 'Small', price: 1.5, _id: '662022b199658327ab53a654' }
        //     ],
        //     extraIngredientPrices: [
        //       { name: 'Extra Cheese', price: 1, _id: '662022b199658327ab53a655' },
        //       { name: 'Extra Bacon', price: 2, _id: '662022b199658327ab53a656' }
        //     ]
        //   }
        menuItem.updateOne({ _id: req.body._id }, req.body)
        .then(() =>  res.status(201).json({ status: "success" }))
        .catch((error) => {res.status(401).json({ status: error })})
      }
      createMenu(req,res) {
        console.log(req.body.category)
        req.body.category = new mongoose.Types.ObjectId(req.body.category? req.body.category:'661cf412be42e6d13bdbae2c');
        const newCategory = new menuItem(req.body)
        newCategory.save()
        .then(() => res.status(200).json({status:"success"}))
        .catch((error) => console.log(error))
      }
    deleteMenu(req,res) {
        const id = req.params.id;
        menuItem.deleteOne({_id:id})
        .then(() => res.status(200).json({status:"sucess"}))
        .catch((error) => res.status(400).json({status:error}))
    }
}

module.exports = new MenuController();
