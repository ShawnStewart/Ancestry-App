const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const validateRegistration = require("../../validation/validateRegistration");

// @route   POST api/users/register
// @desc    Registers a new user
// @access  Public
router.get("/register", (req, res) => {
  // Validation check
  const { errors, isValid } = validateRegistration(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if username is unique
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        errors.username = "That username has already been taken";
        return res.status(400).json(errors);
      } else {
        const { username, password, email } = req.body;
        const newUser = new User({ username, password, email });

        // Hash the password
        bcrypt.genSalt(11, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            } else {
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            }
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});
