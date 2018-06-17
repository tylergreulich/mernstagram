const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  data.postImage = !isEmpty(data.postImage) ? data.postImage : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (Validator(data.postImage === null)) {
    errors.postImage = 'Please upload an image';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
