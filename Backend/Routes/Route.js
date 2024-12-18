const express = require('express');
const router = express();


const {signup} = require('../Controllers/SignupUser')
const {loginuser} = require('../Controllers/LoginUser');
const {createEmployee} = require('../Controllers/CreateEmployee');
const {jwtAuthMiddlerWare} = require('../jwt');
const {edituser} = require('../Controllers/editUser')

 router.route('/signup').post(signup)
 router.route('/login').post(loginuser)
 router.route('/createEmployee').post(jwtAuthMiddlerWare,createEmployee);
 router.route('/edituser').put(jwtAuthMiddlerWare,edituser)

 module.exports = router;