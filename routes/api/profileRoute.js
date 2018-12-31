const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Profile = require("../../models/Profile");

// @route   GET api/profiles/test
// @desc    Creates a new profile
// @access  Private
router.get("/test", (req, res) => {
  res.json({ success: true });
});

// @route   POST api/profiles/create
// @desc    Creates a new profile
// @access  Private

module.exports = router;
