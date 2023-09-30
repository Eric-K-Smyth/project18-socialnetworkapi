const { connect, connection } = require('mongoose');

// Get the MongoDB connection URL from an environment variable (if available)
const connectionString = process.env.MONGODB_URI;

// Create a function to connect to the database
const connectToDatabase = async () => {
  try {
    await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

// Event listeners for database connection events
connection.on('connected', () => {
  console.log('MongoDB connected to', connectionString);
});

connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Export the connection and the connectToDatabase function
module.exports = { connection, connectToDatabase };
