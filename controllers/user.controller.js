const User = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const secret=require('../config.json')

//signup
exports.signUpUser = async(req, res, next) => {
  try {
    
    console.log(req.body)
    const full_name=req.body.fullname
    const username= req.body.username
    const password=req.body.password

    if (!username || !password) {
      const error = new Error("Please fill all field.")
      error.statusCode = 400
      throw error;
    }
    if (password.length < 5) {
      const error = new Error("the password need to be atleast 5 charcter long.")
      error.statusCode = 400
      throw error;
    }
      const anyusername = await User.findOne({
      username: username,
    });
   
    if (anyusername) {
      const error = new Error("user-name is already in use")
      error.statusCode = 400
      throw error;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      fullName:full_name,
      username: username,
      password: passwordHash,
    })
    await user.save()
    const token = jwt.sign({ sub: user._id, username: user.username },secret.SECRET);
    console.log(token)
    return res.redirect('signup');
  }
  
  catch(error) {
    !!error.statusCode? error.statusCode : error.statusCode=500;
    return res.render('signup',{message:error.message,status:false});
  }
};

//for log in
exports.loginUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const username=req.body.username;
    const password = req.body.password
    if (!username || !password) {
      const error = new Error("Please fill all field.")
      error.statusCode = 400
      throw error;
    }
    const user = await User.findOne({
      username: username,
    });

    if (!user) {
      const error = new Error("No account with this user-name exist")
      error.statusCode = 400
      throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      const error = new Error("Invalid credential.")
      error.statusCode = 400
      throw error;
    }
    const token = jwt.sign({ sub: user._id, username: user.username }, secret.SECRET);
    console.log(token)
    return res.redirect('home');
}
  catch(error) {
    console.log("error")
    !!error.statusCode? error.statusCode : error.statusCode=500;
    return res.status(422).render('login',{message:error.message,status:false});
  }
};

//update user info
exports.updateUser = async (req, res, next) => {
  try {
    const name = req.body.name
    const password=req.body.password
    const id=req.user.sub;
    let passwordHash
    let updateinfo={}
if (!!name) {
     updateinfo.name=name
    }
if(!!password)
{
    if (password.length < 5) {
      const error = new Error("the password need to be atleast 5 charcter long.")
      error.statusCode = 400
      throw error;
    }
    const salt = await bcrypt.genSalt();
    passwordHash = await bcrypt.hash(password, salt);
    updateinfo.password=passwordHash
  }
  updateinfo={$set:updateinfo}
  await User.findByIdAndUpdate(id,updateinfo)
  return res.render('account',{message:"information changed successfully"})
  }
  catch(error) {
    return res.render('account',{message:"error, please try again"});
  }
};
