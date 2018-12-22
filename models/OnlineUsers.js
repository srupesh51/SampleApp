const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onlineUsersSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  type: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: Schema.Types.ObjectId,
    ref: 'messages'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = OnlineUsers = mongoose.model('onlineusers',onlineUsersSchema);
