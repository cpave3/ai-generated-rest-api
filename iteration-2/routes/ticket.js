// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const datastore = require('../datastore');

// Create a router instance
const router = express.Router();

// Define routes for Ticket resource
router.get('/tickets', (req, res) => {
  res.json(datastore.tickets);
});

router.get('/tickets/:id', (req, res) => {
  const ticket = datastore.tickets.find(t => t.id === req.params.id);
  if (!ticket) {
    res.status(404).send('Ticket not found');
  } else {
    res.json(ticket);
  }
});

router.post('/tickets', (req, res) => {
  const { summary, description, author_id } = req.body;
  const newTicket = {
    id: uuid.v4(),
    summary,
    description,
    author_id,
  };
  datastore.tickets.push(newTicket);
  res.status(201).json(newTicket);
});

router.put('/tickets/:id', (req, res) => {
  const ticketIndex = datastore.tickets.findIndex(t => t.id === req.params.id);
  if (ticketIndex === -1) {
    res.status(404).send('Ticket not found');
  } else {
    const { summary, description, author_id } = req.body;
    const updatedTicket = {
      id: req.params.id,
      summary,
      description,
      author_id,
    };
    datastore.tickets[ticketIndex] = updatedTicket;
    res.json(updatedTicket);
  }
});

router.delete('/tickets/:id', (req, res) => {
  const ticketIndex = datastore.tickets.findIndex(t => t.id === req.params.id);
  if (ticketIndex === -1) {
    res.status(404).send('Ticket not found');
  } else {
    datastore.tickets.splice(ticketIndex, 1);
    res.sendStatus(204);
  }
});

// Export the router instance
module.exports = router;