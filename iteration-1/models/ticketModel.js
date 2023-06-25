// models/ticketModel.js

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;