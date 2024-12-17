const express = require('express');
const router = express();


const {signup} = require('../Controllers/SignupUser')
const {loginuser} = require('../Controllers/LoginUser')

 router.route('/signup').post(signup)
 router.route('/login').post(loginuser)

 module.exports = router;