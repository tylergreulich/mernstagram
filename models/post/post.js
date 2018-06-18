const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  text: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  avatar: {
    type: String
  },
  postImage: {
    type: String,
    required: true
  },
  likes: [
    {
      account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
      }
    }
  ],
  comments: [
    {
      account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
      },
      text: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
