const Validator = require("validator");
const checkEmpty = require("./checkEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.owner = !checkEmpty(data.owner) ? data.owner : "";
  data.name.first = !checkEmpty(data.name.first) ? data.name.first : "";
  data.name.middle = !checkEmpty(data.name.middle) ? data.name.middle : "";
  data.name.last = !checkEmpty(data.name.last) ? data.name.last : "";
  data.gender = !checkEmpty(data.gender) ? data.gender : "";

  // owner
  if (Validator.isEmpty(data.owner)) {
    errors.owner = "Missing owner id";
  }

  // first name
  if (Validator.isEmpty(data.name.first)) {
    errors.firstName = "First name is required";
  }

  // middle name
  if (Validator.isEmpty(data.name.middle)) {
    errors.middleName = "Middle name is required";
  }

  // last name
  if (Validator.isEmpty(data.name.last)) {
    errors.lastName = "Last name is required";
  }

  // gender
  if (Validator.isEmpty(data.gender)) {
    errors.gender = "A selection is required";
  }

  return { errors, isValid: checkEmpty(errors) };
};
