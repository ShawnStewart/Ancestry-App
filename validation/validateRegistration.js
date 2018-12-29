const Validator = require("validator");
const checkEmpty = require("./checkEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !checkEmpty(data.username) ? data.username : "";
  data.password = !checkEmpty(data.password) ? data.password : "";
  data.confirmation = !checkEmpty(data.confirmation) ? data.confirmation : "";
  data.email = !checkEmpty(data.email) ? data.email : "";

  // username
  if (Validator.isEmpty(data.username)) {
    errors.username = "Please enter a username";
  } else if (!Validator.isLength(data.username, { max: 30 })) {
    errors.username = "Username cannot be more than 30 characters";
  }

  // password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Please enter a password";
  } else if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // confirmation
  if (Validator.isEmpty(data.confirmation)) {
    errors.confirmation = "Please confirm your password";
  } else if (!Validator.equals(data.password, data.confirmation)) {
    errors.confirmation = "Passwords must match";
  }

  // email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Please enter an email";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return { errors, isValid: checkEmpty(errors) };
};
