require("dotenv").load();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userRoute = require("./routes/api/userRoute");
const profileRoute = require("./routes/api/profileRoute");

// MongoDB Config
const db = process.env.MONGO_URI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("=== Connected to MongoDB ===\n");
  })
  .catch(err => {
    console.log("=== ERROR ===\n", err);
  });

// Set up passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// Connect routes
app.use("/api/users", userRoute);
app.use(
  "/api/profiles",
  passport.authenticate("jwt", { session: false }),
  profileRoute
);

app.listen(port, () => console.log(`\nServer running on port ${port}`));
