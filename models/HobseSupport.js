const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hobseSupportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hobse_info: {
    type: Schema.Types.Mixed,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = HobseSupport = mongoose.model('hobsesupport',hobseSupportSchema);
