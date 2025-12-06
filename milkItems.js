const mongoose = require("mongoose");
const productSchema = require("./schema");

const MilkItem = mongoose.model("MilkItem", productSchema);

module.exports = MilkItem;