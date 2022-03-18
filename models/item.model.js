const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    //post detail
    //shoes cloth electronics....
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


const ItemPost = mongoose.model("item", ItemSchema);

module.exports = ItemPost;