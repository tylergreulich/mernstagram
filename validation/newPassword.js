const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateLogin = data => {
  let errors = {};

  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';

  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = 'Please enter a new password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
