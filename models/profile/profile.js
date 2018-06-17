const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  username: {
    type: String
  },
  fullname: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },
  followers: [
    {
      account: {
        type: String,
        ref: 'Account'
      }
    }
  ],
  bio: {
    type: String
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = {
  Profile,
  profileSchema
};
