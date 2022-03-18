const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
    
  },
  catagoryType: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
},
price: {
    type: Number,
    trim: true,
    required: true,
},
description: {
    type: String,
    trim: true,
},
imageUrl: {
    type: Array,
    trim: true,
    required: true,
},
},
  {
    timestamps: true,
  },
);

const History = mongoose.model("history", HistorySchema);

module.exports = History;