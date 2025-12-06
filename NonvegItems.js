const mongoose = require("mongoose");
const productSchema = require("./schema");

const NonvegItem = mongoose.model("NonvegItem", productSchema);

module.exports = NonvegItem;
