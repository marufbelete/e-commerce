const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
 
},
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

module.exports = User;