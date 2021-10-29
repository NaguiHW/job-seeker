const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors');

// Initialize
const users = express();
const jobs = express();

// Middlewares
users.use(cors());
users.use(express.json());
// jobs.use(cors());
// jobs.use(express.json());

// Import routes
const userRoute = require('./routes/user');

// Use routes
users.use('/', userRoute);

// Exports
exports.users = functions.https.onRequest(users);

