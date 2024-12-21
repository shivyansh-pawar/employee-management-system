const express = require('express');
const router = express();


const {signup} = require('../Controllers/SignupUser')
const {loginuser} = require('../Controllers/LoginUser');
const {createEmployee} = require('../Controllers/CreateEmployee')
const {editEmployee} = require('../Controllers/editEmployee')
const {jwtAuthMiddlerWare} = require('../jwt');
const {getUser} = require('../Controllers/getUser')
const {editUser} = require('../Controllers/editUser')
const {getEmployee} = require('../Controllers/getEmployee')
const {deleteEmployee} = require('../Controllers/deleteEmployee')


 router.route('/signup').post(signup)
 router.route('/login').post(loginuser)
 router.route('/createEmployee').post(jwtAuthMiddlerWare,createEmployee);
 router.route('/editEmployee').put(jwtAuthMiddlerWare,editEmployee)
 router.route('/deleteEmployee').delete(jwtAuthMiddlerWare,deleteEmployee)
 router.route('/editUser').put(jwtAuthMiddlerWare,editUser)
 router.route('/getuser').get(jwtAuthMiddlerWare,getUser)
 router.route('/getEmployeeData').get(jwtAuthMiddlerWare,getEmployee)

 module.exports = router;