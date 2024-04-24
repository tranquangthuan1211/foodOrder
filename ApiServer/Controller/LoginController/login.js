require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Users = require('../../model/user')
class LoginController {
    getAdmin(req,res){
        // const payload = {
        //     userId: 1,
        //     username: 'john_doe'
        // }
        // const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '1h' });
        // jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        //     if (err) {
        //       return res.status(403).json({ message: 'Token không hợp lệ' });
        //     }
           
        //     res.status(200).send(decoded)
        //   });
    }
    // login admin
    handleLogin (req, res){
      Users.findOne({email:req.body.email})
      .then((user) => {
        if(user) {
          const validPassword = bcrypt.compare(req.body.password, user.password);
          if(validPassword){
            res.status(200).json({status:"ok",id:user._id})
            return;
          }
          res.status(400).json({status:"errorPass"})
        }else {
          res.status(400).json({status:"errorEmail"})
          return;
        }
      })
      .catch((error) => {
            res.status(401).send({error:error})
      })
    }
}

module.exports = new LoginController()