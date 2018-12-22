const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
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

module.exports = Conversation = mongoose.model('conversations',conversationSchema);
