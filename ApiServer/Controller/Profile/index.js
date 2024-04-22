require('dotenv').config();
const User = require('../../model/user')
class ProfileController {
    async getUser (req,res) {
        const id = req.params.id
        console.log(id)
        await User.findOne({_id:id})
        .then((user) => {
            console.log(user)
            res.status(200).json(user)
        })
        .catch((error) => res.json({error:error}))
    }
    async handleUpload(req, res) {
        const fileImage = req.file
        if(fileImage) {
            res.status(200).json({link:fileImage.path})
        }
        else {
            res.status(401).json({link:"error"})
        }
    }

        
    
    handleProfile(req,res){
        const id = req.params.id
        console.log(req.body)
        // const data = {
        //     name: 'Thuan',
        //     image: 'https://uc8edafe666b5a9e0583d4c9c0f8.dl.dropboxusercontent.com/cd/0/get/CRSS82y2h2msGiLTaJ_DOOK1TjXYKFqwRBDt9gpNWnOBtGbRB5B5CoA3cqNN_kbtkOVRZwcUyZzy9c_lC0SLyPtRDQdH3spRNZL_bSggK_-C_db_ZfZzlW4l73aXNcCiF8Fz1Kv9hfxIzCDunEmy4Le7X0iuZr5ptnE5mekYdlQ0Kg/file',
        //     phone: '',
        //     admin: 1,
        //     streetAddress: '',
        //     city: '',
        //     country: '',
        //     postalCode: ''
        //   }
        User.updateOne({_id:id},req.body)
        .then(() => res.status(200).json({status:'success'}))
        .catch((error) => res.status(400).json({status:error}))
    }
}

module.exports = new ProfileController();