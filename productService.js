const VegItem = require("./VegItems");
const NonvegItem = require("./NonvegItems");
const MilkItem = require("./milkItems");
const OrderModel = require("./orders");
const User = require("./User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Single insert
const addVegItemService = (data) => {
  const vegItem = new VegItem(data);
  return vegItem.save();
};

const addNonvegItemService = (data) => {
  const nonvegItem = new NonvegItem(data);
  return nonvegItem.save();
};

const addMilkItemService = (data) => {
  const milkItem = new MilkItem(data);
  return milkItem.save();
};

// Bulk insert
const addMultipleVegItemsService = (dataArray) => {
  return VegItem.insertMany(dataArray);
};

const addMultipleNonvegItemsService = (dataArray) => {
  return NonvegItem.insertMany(dataArray);
};

const addMultipleMilkItemsService = (dataArray) => {
  return MilkItem.insertMany(dataArray);
};

// Register User
const registerUserService = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const newUser = new User(data);
  const savedUser = await newUser.save();

  // remove password in response
  const userObj = savedUser.toObject();
  delete userObj.password;

  return userObj;
};


// Fetch
const getVegItemsService = () => VegItem.find();
const getNonvegItemsService = () => NonvegItem.find();
const getMilkItemsService = () => MilkItem.find();
// Save order
const saveOrderService = async (orderData) => {
  return await OrderModel.create(orderData);
};

const getOrdersService = async () => {
  return await OrderModel.find();
};

// Get all users
const getUsersService = async () => {
  return await User.find();
};

const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  // Create JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  
  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};

module.exports = {
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
};
