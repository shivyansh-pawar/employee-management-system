const mongoose = require('mongoose');

require('dotenv').config(); 

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('mongodb connected successfully')
})

db.on('error',(error)=>{
    console.log(error)
})

db.on('disconnected',()=>{
    console.log('mongodb connection error')
})


module.exports = db;