const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const validateRegistration = require("../../validation/validateRegistration");
const validateLogin = require("../../validation/validateLogin");

// @route   GET api/users/current
// @desc    Get the user based on the token
// @access  Public
router.get("/current", (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    return res.json(decoded);
  });
});

// @route   POST api/users/register
// @desc    Registers a new user
// @access  Public
router.post("/register", (req, res) => {
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
                .then(user => res.status(201).json(user))
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

// @route   POST api/users/login
// @desc    Log in to user account
// @access  Public
router.post("/login", (req, res) => {
  // Validation check
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;

  User.findOne({ username }, "+password")
    .then(user => {
      if (!user) {
        errors.username = "Invalid login";
        res.status(400).json(errors);
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, username: user.username };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1hr" },
            (err, token) => {
              return res.json({ success: true, token: `Bearer ${token}` });
            }
          );
        } else {
          errors.username = "Invalid login";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
