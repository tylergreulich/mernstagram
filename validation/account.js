const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.username = 'Username needs to be between 2 and 40 characters';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }

  if (Validator.isLength(data.website, { min: 1 })) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
