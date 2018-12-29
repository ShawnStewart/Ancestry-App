require("dotenv").load();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MongoDB Config
const db = process.env.MONGO_URI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("=== Connected to MongoDB ===\n");
  })
  .catch(err => {
    console.log("=== ERROR ===\n", err);
  });

app.listen(port, () => console.log(`\nServer running on port ${port}`));
