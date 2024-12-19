const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db');
const app = express();
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5000
const route = require('./Routes/Route');

app.use(cors())
app.use(cookieParser())

app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(route)
app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.listen(PORT,()=>{
    console.log('this server is up and listing on PORT 5000')
})