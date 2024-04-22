const Order = require('../../model/orders')
class OrderController {
    getOder(req,res){
        Order.find({})
        .then((orders) => res.status(200).json(orders) )
        .catch((error) => console.log(error))
    }
    getIdorder(req,res){
        const id = req.params.id
        Order.findOne({_id:id})
        .then((orders) => res.status(200).json(orders) )
        .catch((error) => console.log(error))
    }
    handlePay(req,res){
        const id = req.params.id
        Order.updateOne({_id:id},{ $set: { paid: 1 }})
        .then(() => res.status(200).json({status:"success"}))
        .catch((error) => console.log(error))
    }
    
}
module.exports = new OrderController()