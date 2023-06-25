// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('./routes/user');
const ticketRoutes = require('./routes/ticket');
const commentRoutes = require('./routes/comment');

// Create express app
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Use routes
app.use('/users', userRoutes);
app.use('/tickets', ticketRoutes);
app.use('/comments', commentRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});