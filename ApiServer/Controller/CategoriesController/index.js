const Categories = require('../../model/catogories')
class CategoriesController {
    getCategories(req,res){
        Categories.find({})
        .then((categories) => 
            res.status(200).json(categories)
        )
        .catch((error) => {
            res.status(400).json(error)
        })
    }
    createCategories(req,res){
        console.log(req.body)

        const newCategory = new Categories(req.body)
        newCategory.save()
        .then(() => res.status(200).json({status:"success"}))
        .catch((error) => console.log(error))
    }
    updateCategories (req,res,next){
        console.log(req.body)
        Categories.updateOne({_id:req.body._id},req.body.data)
        .then(() => res.status(200).json({status:"success"}))
        .catch((error) =>next(error))
    }
    deleteCategories (req,res,next){
        const id = req.params.id;
        console.log(id)
        Categories.deleteOne({_id:id})
        .then(() => res.status(200).json({status:'success'}))
        .catch((error) => next(error))

    }
}

module.exports = new CategoriesController()