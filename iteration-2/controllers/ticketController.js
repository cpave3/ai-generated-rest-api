const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const datastore = require('../datastore');
const ticketModel = require('../models/ticketModel');

// Get all tickets
router.get('/', (req, res) => {
  res.json(datastore.tickets);
});

// Get a single ticket
router.get('/:id', (req, res) => {
  const ticket = ticketModel.getTicketById(req.params.id);
  if (!ticket) {
    res.status(404).json({ message: `Ticket with ID ${req.params.id} not found` });
  } else {
    res.json(ticket);
  }
});

// Create a new ticket
router.post('/', (req, res) => {
  const { summary, description, author_id } = req.body;
  if (!summary || !description || !author_id) {
    res.status(400).json({ message: 'Summary, description, and author ID are required' });
  } else {
    const newTicket = {
      id: uuid.v4(),
      summary,
      description,
      author_id,
    };
    datastore.tickets.push(newTicket);
    res.status(201).json(newTicket);
  }
});

// Update a ticket
router.put('/:id', (req, res) => {
  const ticket = ticketModel.getTicketById(req.params.id);
  if (!ticket) {
    res.status(404).json({ message: `Ticket with ID ${req.params.id} not found` });
  } else {
    const { summary, description, author_id } = req.body;
    if (!summary || !description || !author_id) {
      res.status(400).json({ message: 'Summary, description, and author ID are required' });
    } else {
      ticket.summary = summary;
      ticket.description = description;
      ticket.author_id = author_id;
      res.json(ticket);
    }
  }
});

// Delete a ticket
router.delete('/:id', (req, res) => {
  const index = datastore.tickets.findIndex(ticket => ticket.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: `Ticket with ID ${req.params.id} not found` });
  } else {
    datastore.tickets.splice(index, 1);
    res.sendStatus(204);
  }
});

module.exports = router;