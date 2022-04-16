const express = require("express");
const app = express();
const multer=require('multer')
const passport=require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const session=require('express-session')
const mongoose=require("mongoose");
const path =require('path')
const userroute=require('./routes/user.route');
require('dotenv').config({path:".env"});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(multer)
app.use(userroute)
// app.use(postroute)
app.set('view engine', 'ejs');
app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({seceret:"some secret"}))

// use res.render to load up an ejs view file
app.use(express.static(path.join(__dirname,'public')))


// Passport strategy for login via facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.BASE_SERVER_URL + '/facebook/callback',
  profileFields: ['id', 'first_name', 'last_name', 'email', 'picture'],
  passReqToCallback: true
},
  function (req, accessToken, refreshToken, profile, done) {
    console.log("profile")
    console.log(profile)
    // process.nextTick(async function () {
    //   console.log("Facebook authentication triggered")
    //   try {
    //     // Check if the fb profile has an email associated. Sometimes FB profiles can be created by phone
    //     // numbers in which case FB doesn't have an email - If email is not present, we fail the signup 
    //     // with the proper error message
    //     if (!profile._json.email) {
    //       return done(null, false,
    //         { message: 'Facebook Account is not registered with email. Please sign in using other methods' })
    //     }
    //     let data = await utils.getOrCreateNewUserWithMedium(
    //       accessToken,
    //       profile.id,
    //       profile._json.first_name,
    //       profile._json.last_name,
    //       profile._json.picture.data.url,
    //       profile._json.email,
    //       'facebook',
    //       parseInt(req.query.state)) // An optional param you can pass to the request 
    //     if(data.alreadyRegisteredError){
    //       // You can also support logging the user in and overriding the login medium
    //       done(null, false, {
    //         message: `Email is alredy registered with ${data.medium} account. Please login with email.`
    //       });
    //     } else {
    //       done(null, { id: data.id, email: data.email, firstName: data.firstName, lastName: data.lastName });
    //     }
    //   } catch (err) {
    //     return done(null, null, {message: 'Unknown error'})
    //   }
    // });
  }
));
// index page
app.get('/login', function(req, res) {
  res.render('login');
});
app.get('/signup', function(req, res) {
  res.render('signup');
});
app.get('/home', function(req, res) {
  res.render('home');
});
app.get('/', function(req, res) {
  res.redirect('/login');
});
app.get('/footer',function(req,res){
  res.render('includes/footer')
})
app.get('/header',function(req,res){
  res.render('includes/header')
})

passport.serializeUser((user,done)=>{
  console.log("user")
  console.log(user)
done(null,user)
})
passport.deserializeUser((id,done)=>{
  console.log("id")
  console.log(id)
  return done(id)
})


mongoose.connect("mongodb+srv://maruf:maruf@cluster0.l2ygl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true
})
mongoose.connection.on("error", err => {
  console.log("err please try again")
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose connected")
})

app.listen(process.env.PORT, function () {
  console.log(`Listening on port ${process.env.PORT}!`);
});