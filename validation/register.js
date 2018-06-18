const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateRegister = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isLength(data.fullname, { min: 5, max: 30 })) {
    errors.name = 'Name must be between 5 and 30 characters';
  }

  if (!Validator.isLength(data.username, { min: 5, max: 30 })) {
    errors.name = 'Username must be between 5 and 30 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.name = 'Username is required';
  }

  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = 'Full name is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
