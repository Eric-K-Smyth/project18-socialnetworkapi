const express = require('express');
const mongoose = require('mongoose');
const { connectToDatabase } = require('./config/connection'); // Import the connectToDatabase function
const db = require('./config/connection');
// Import route files
const userRoutes = require('./routes/user-routes');
const thoughtRoutes = require('./routes/thought-routes');
const reactionRoutes = require('./routes/reaction-routes');

const cwd = process.cwd();
const PORT = process.env.PORT || 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('01-Activities') ? cwd.split('01-Activities')[1] : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use route files
app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);
app.use('/api', reactionRoutes);

// Establish the MongoDB connection using the connectToDatabase function
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server for ${activity} running on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

