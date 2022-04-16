const express = require('express');
const userauth = require("../middleware/auth.middleware")
const passport = require('passport')
const {loginUser,signUpUser,updateUser} = require('../controllers/user.controller')

const router=express.Router()
// Facebook authentication strategy
router.use('/auth/facebook', passport.authenticate('facebook', {scope: [ "email" ]}))
router.get('/facebook/callback', passport.authenticate('facebook',{
    successRedirect:"/home",
    failureRedirect:"/login"
}))
// router.get('/facebook/delete', authController.deleteFacebookData)

// // Google authentication strategy
// router.use('/api/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
// router.get('/api/google/callback', authController.loginGoogle)
// router.get('/api/google/delete', authController.deleteGoogleData)

// // LinkedIn authentication strategy - similar to above
// router.use('/api/auth/linkedin', passport.authenticate('linkedin'))
// router.get('/api/linkedin/callback', authController.loginLinkedin)
// router.get('/api/linkedin/delete', authController.deleteLinkedinData)

// You can add more providers similarily
router.post('/login',loginUser)
router.post('/signup',signUpUser)
router.post('/updateuser',userauth,updateUser)

module.exports = router

