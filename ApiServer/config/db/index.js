require('dotenv').config()
const mongoose = require('mongoose')
async function connect () {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("connect successfully!!!")
    }catch(error){
        console.log(error)
    }
}

module.exports = {connect}