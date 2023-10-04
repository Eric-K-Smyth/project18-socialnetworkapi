const mongoose = require('mongoose');

// Node will look for this environment variable, and if it exists, it will use it.
// Otherwise, it will assume that you are running this application locally.
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetwork';

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB!');
});

module.exports = db;
