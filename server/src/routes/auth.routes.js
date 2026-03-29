const express= require('express')
const authcontroller =require('../controllers/auth.controller')
const router =express.Router()

router.post('/register',authcontroller.registeruser)

router.post('/login',authcontroller.loginuser)

module.exports=router