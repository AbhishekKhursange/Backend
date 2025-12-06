// orders.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },    // optional
  finalAmount: { type: Number },              // optional (if you need it)
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orders', orderSchema);
