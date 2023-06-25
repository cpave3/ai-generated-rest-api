const express = require('express');
const app = express();

const userRoutes = require('./modules/users/userRoutes');
const ticketRoutes = require('./modules/tickets/ticketRoutes');
const commentRoutes = require('./modules/comments/commentRoutes');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/tickets', ticketRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));