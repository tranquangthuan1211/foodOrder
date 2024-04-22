const Users = require('../../model/user')
class HomeController {
    getUser(req,res){
        const id = req.body.id;
        console.log(id)
        Users.findOne({_id:id})
        .then((user) => {
            user.password = '';
            return res.status(200).json({user:user})
        })
        .catch((error) => {
            return res.status(500).json({error:error})
        })
    }
}
module.exports = new HomeController();