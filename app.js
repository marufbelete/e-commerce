const express = require("express");
const app = express();
const multer=require('multer')
const mongoose=require("mongoose");
const path =require('path')
const userroute=require('./routes/user.route');
const secret=require('./config.json')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// // app.use(multer)
app.use(userroute)
// app.use(postroute)

app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use(express.static(path.join(__dirname,'public')))
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

mongoose.connect("mongodb+srv://maruf:maruf@cluster0.l2ygl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true
})
mongoose.connection.on("error", err => {
  console.log("err please try again")
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose connected")
})

app.listen(secret.PORT, function () {
  console.log(`Listening on port ${secret.PORT}!`);
});