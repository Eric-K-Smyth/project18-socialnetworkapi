// Import required modules and files
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// Define the port number for the server to listen on
const PORT = process.env.PORT || 3001;
const app = express();

// Create an instance of the Express application
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware: Use the defined routes for handling incoming requests
app.use(routes);
// Establish a connection to the database and start the server once the connection is open
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});



