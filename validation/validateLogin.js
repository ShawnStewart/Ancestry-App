const Validator = require("validator");
const checkEmpty = require("./checkEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !checkEmpty(data.username) ? data.username : "";
  data.password = !checkEmpty(data.password) ? data.password : "";

  // username
  if (Validator.isEmpty(data.username)) {
    errors.username = "Please enter a username";
  }

  // password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Please enter a password";
  }

  return { errors, isValid: checkEmpty(errors) };
};
