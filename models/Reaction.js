const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280, // Maximum 280 characters
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toDateString(), // Format timestamp
  },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
