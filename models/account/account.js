const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const { followerSchema } = require('../folower/follower');

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true,
    minlength: 5
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  avatar: {
    type: String,
    required: true
  },
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
      }
    }
  ],
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
      }
    }
  ]
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
  Account,
  accountSchema
};
