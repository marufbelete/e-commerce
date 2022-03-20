const express = require('express');
const userauth = require("../middleware/auth.middleware")
const {loginUser,signUpUser,updateUser} = require('../controllers/user.controller')

const router=express.Router()
router.post('/login',loginUser)
router.post('/signup',signUpUser)
router.post('/updateuser',userauth,updateUser)

module.exports = router

