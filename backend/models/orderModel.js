const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  orderID: Number,
  userID: mongoose.Schema.Types.ObjectId,
  storeID: mongoose.Schema.Types.ObjectId,
  products: [{
    name: String,
    image: String,
    price: Number,
  }]
});

module.exports = mongoose.model('Order', orderSchema);