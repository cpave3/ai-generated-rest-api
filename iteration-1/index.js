// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Importing routes
const userRoutes = require('./routes/user');
const ticketRoutes = require('./routes/ticket');
const commentRoutes = require('./routes/comment');

// Initializing the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/tickets', ticketRoutes);
app.use('/comments', commentRoutes);

// Error handling middleware
app.use(require('./middlewares/errorHandler'));

// Connecting to the database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
        // Starting the server
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Error connecting to the database: ${err.message}`);
    });