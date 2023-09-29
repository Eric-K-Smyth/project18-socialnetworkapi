const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});