const express = require('express');
const userauth = require("../middleware/auth.middleware")
const { saveUser } = require('../controllers/user.controller');
const { loginUser,updateUser } = require('../controllers/user.controller');
const {loginErrorHandler} = require('../middleware/loginerrohandling.middleware')
const router = express.Router();

router.post('/register', saveUser,loginErrorHandler)
router.post('/login', loginUser,loginErrorHandler)
router.post('/updateuser',userauth,updateUser,loginErrorHandler)


module.exports = router

