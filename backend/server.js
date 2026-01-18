const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const mongoose = require('mongoose'); // Add mongoose requirement
const connectDB = require('./config/db'); // We will create this or inline it

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
const volunteers = require('./routes/volunteers');

app.use('/api/volunteers', volunteers);

const PORT = process.env.PORT || 5000;

// Connect to DB (Simple inline connection if config/db.js doesn't exist yet, but let's try to be clean)
// Check if we should create config/db.js or just inline. Let's inline for simplicity unless I see config folder.
// I saw config folder in the tree structure in user request, let's create it properly.

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});

module.exports = app; // For testing
