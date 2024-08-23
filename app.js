// src/app.js
const express = require('express');
require('dotenv').config();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./config/db');

const errorHandler = require('./middleware/errorHandler');

const {bookRouter} = require("./Routes/book.routes");
const {userRouter} = require("./Routes/user.routes");
const {auditRouter} = require("./Routes/auditLog.routes");

dotenv.config();

const app = express();

// Connect to database
connectDB();
console.log("Database connection Established");

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/books',bookRouter);
app.use('/users',userRouter);
app.use('/audit-logs',auditRouter);

app.use(express.static('Public'));
// Error handling middleware
// app.use(errorHandler);

module.exports = app;
