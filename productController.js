const orders = require("./orders");
const {
  addVegItemService,
  addNonvegItemService,
  addMilkItemService,
  addMultipleVegItemsService,
  addMultipleNonvegItemsService,
  addMultipleMilkItemsService,
  getVegItemsService,
  getNonvegItemsService,
  getMilkItemsService,
  saveOrderService,
  getOrdersService,
  registerUserService,
  getUsersService,
  loginUserService
} = require("./productService");

const bcrypt = require("bcryptjs");
const auth = require("./authentication");

// Single insert
const addVegItem = async (req, res) => {
  try {
    const result = await addVegItemService(req.body);
    res.status(201).send({ message: "Veg item added successfully", item: result });
  } catch (error) {
    res.status(500).send({ message: "Error adding veg item", error: error.message });
  }
};

const addNonvegItem = async (req, res) => {
  try {
    const result = await addNonvegItemService(req.body);
    res.status(201).send({ message: "Nonveg item added successfully", item: result });
  } catch (error) {
    res.status(500).send({ message: "Error adding nonveg item", error: error.message });
  }
};

const addMilkItem = async (req, res) => {
  try {
    const result = await addMilkItemService(req.body);
    res.status(201).send({ message: "Milk item added successfully", item: result });
  } catch (error) {
    res.status(500).send({ message: "Error adding milk item", error: error.message });
  }
};

// Bulk insert
const addMultipleVegItems = async (req, res) => {
  try {
    const result = await addMultipleVegItemsService(req.body);
    res.status(201).send({ message: "Multiple veg items added successfully", items: result });
  } catch (error) {
    res.status(500).send({ message: "Error adding multiple veg items", error: error.message });
  }
};

const addMultipleNonvegItems = async (req, res) => {
  try {
    const result = await addMultipleNonvegItemsService(req.body);
    res.status(201).send({ message: "Multiple nonveg items added successfully", items: result });
  } catch (error) {
    res.status(500).send({ message: "Error adding multiple nonveg items", error: error.message });
  }
};

const addMultipleMilkItems = async (req, res) => {
  try {
    const result = await addMultipleMilkItemsService(req.body);
    res.status(201).send({ message: "Multiple milk items added successfully", items: result });
  } catch (error) {
    res.status(500).send({ message: "Error adding multiple milk items", error: error.message });
  }
};

// Register User
const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};


// Get items
const getVegItems = async (req, res) => {
  try {
    const items = await getVegItemsService();
    res.send({ items });
  } catch (error) {
    res.status(500).send({ message: "Error fetching veg items", error: error.message });
  }
};

const getNonvegItems = async (req, res) => {
  try {
    const items = await getNonvegItemsService();
    res.send({ items });
  } catch (error) {
    res.status(500).send({ message: "Error fetching nonveg items", error: error.message });
  }
};

const getMilkItems = async (req, res) => {
  try {
    const items = await getMilkItemsService();  
    res.send({ items });
  } catch (error) {
    res.status(500).send({ message: "Error fetching milk items", error: error.message });
  }
};

// Get users
const getUsers = async (req, res) => {
  try {
    const data = await getUsersService();
    res.status(200).send({ users: data });
  } catch (err) {
    res.status(500).send({ message: "Error fetching users", error: err.message });
  }
};

// Save order
const saveOrderController = async (req, res) => {
  try {
    const result = await saveOrderService(req.body);
    res.status(201).send({ message: "Order saved successfully", order: result });
  } catch (error) {
    res.status(500).send({ message: "Error saving order", error: error.message });
  }
};

const getOrdersController = async (req, res) => {
  try {
    const data = await getOrdersService();
    res.status(200).send({ message: "Orders fetched successfully", orders: data });
  } catch (err) {
    res.status(500).send({ message: "Error fetching orders", error: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
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
  registerUser,
  getUsers,
  loginUser
};
