const express = require("express");
const app = express();
const multer=require('multer')
const userroute=require('./routes/user.route')
const postroute=require("./routes/post.route")

app.set('view engine','ejs')

app.use(multer)
app.use(userroute)
app.use(postroute)

mongoose.connect("mongodb://localhost:27017/mela", {
  useNewUrlParser: true
})
mongoose.connection.on("error", err => {
  console.log("err please try again")
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose connected")
})

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});