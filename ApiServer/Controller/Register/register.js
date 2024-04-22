const Users = require('../../model/user')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;
class RegisterControler {
    index(req,res){
        res.send('hello')
    }
    handleRegister(req,res){
        const salt = bcrypt.genSaltSync(saltRounds);
        const newpass = bcrypt.hashSync(req.body.password, salt);
        req.body.password = newpass
        const newUser = new Users(req.body)
        newUser
        .save()
        .then(() => {
            return res.status(200).json({result: "successfully"});
        })
        .catch((error) => console.log(error))
    }

}

module.exports = new RegisterControler()