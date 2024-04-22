const User = require('../../model/user')
class UserController {
    getUser(req,res) {
        User.find({})
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json(error))
    }
}
module.exports = new UserController()