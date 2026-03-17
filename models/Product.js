const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  name:
  {
    type: String,
    required: true
  },

  price:
  {
    type: Number,
    required: true
  },

  quantity:
  {
    type: Number,
    min: 0
  },

  category: String,

  userId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  isDeleted:
  {
    type: Boolean,
    default: false
  }

},
  { timestamps: true });

module.exports = mongoose.model("Product", productSchema);