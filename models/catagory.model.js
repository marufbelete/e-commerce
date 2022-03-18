const mongoose = require("mongoose");

const CatagorySchema = new mongoose.Schema({
//sale or rent
  catagoryType: {
    type: String,
    trim: true,
    required: true,
    unique:[true,"the catagory must be unique"]
  },
},
    {
        timestamps: true,
    },
);


const CatagoryPost = mongoose.model("Catagorypost", CatagorySchema);

module.exports = CatagoryPost ;