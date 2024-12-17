const mongoose = require('mongoose');

const MONGO_URI = "mongodb://localhost:27017/newdata";

mongoose.connect(MONGO_URI,{
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