require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(cors());
app.use(express.json()); // important

app.use("/api/v1/products", router);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// global error handler (nice to have)
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(err.status || 500).send({ error: err.message || "Internal Server Error" });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
module.exports = app;