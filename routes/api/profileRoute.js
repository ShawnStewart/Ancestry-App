const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Profile = require("../../models/Profile");
const validateProfile = require("../../validation/validateProfile");

// @route   GET api/profiles/test
// @desc    Creates a new profile
// @access  Private
router.get("/test", (req, res) => {
  res.json({ success: true });
});

// @route   POST api/profiles/create
// @desc    Creates a new profile
// @access  Private
router.post("/create", (req, res) => {
  // Validation check
  const { errors, isValid } = validateProfile(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Create the profile
  const {
    owner,
    name,
    birthday,
    gender,
    nationality,
    ethnicity,
    metric,
    height,
    weight,
    bio
  } = req.body;
  const newProfile = new Profile({
    owner,
    name,
    birthday,
    gender,
    nationality,
    ethnicity,
    metric,
    height,
    weight,
    bio
  });
  newProfile
    .save()
    .then(profile => res.status(201).json(profile))
    .catch(err => console.log(err));
});

module.exports = router;
