require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(cors());
app.use(express.json()); // important

app.use("/api/v1/products", router);

// global error handler (nice to have)
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(err.status || 500).send({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
