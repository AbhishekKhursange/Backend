const mongoose = require("mongoose");
const productSchema = require("./schema");

const VegItem = mongoose.model("VegItem", productSchema);

module.exports = VegItem;
