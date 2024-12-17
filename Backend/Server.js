const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db');
const app = express();
const path = require('path');
require('dotenv').config()
const PORT = process.env.PORT || 5000
const route = require('./Routes/Route');


app.use(bodyParser.json({limit:"50mb"}));

app.use(route)
app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.listen(PORT,()=>{
    console.log('this server is up and listing on PORT 5000')
})