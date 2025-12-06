const express = require("express");
const {
  addVegItem,
  addNonvegItem,
  addMilkItem,
  addMultipleVegItems,
  addMultipleNonvegItems,
  addMultipleMilkItems,
  getVegItems,
  getNonvegItems,
  getMilkItems,
  saveOrderController,
  getOrdersController,
  getUsers,
  registerUser,
  loginUser
} = require("./productController");

const auth = require("./authentication");

const router = express.Router();
// Protected test route
router.get("/protected", auth, (req, res) => {
  res.status(200).send({ message: "Access granted", user: req.user });
});

// Single insert
router.post("/addVegItem", addVegItem);
router.post("/addNonvegItem", addNonvegItem);
router.post("/addMilkItem", addMilkItem);
// User registration
router.post("/register", registerUser);
router.post("/login", loginUser);


// Bulk insert
router.post("/addMultipleVegItems", addMultipleVegItems);
router.post("/addMultipleNonvegItems", addMultipleNonvegItems);
router.post("/addMultipleMilkItems", addMultipleMilkItems);

// Get
router.get("/getVegItems", getVegItems);
router.get("/getNonvegItems", getNonvegItems);
router.get("/getMilkItems", getMilkItems);
// Get all registered users
router.get("/users", getUsers);

// Save order
router.post("/orders", saveOrderController);
router.get("/orders", getOrdersController);

module.exports = router;
