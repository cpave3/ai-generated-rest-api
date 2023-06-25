// Importing the required modules and models
const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticketModel');

// GET all tickets
router.get('/', async (req, res, next) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
});

// GET a single ticket by id
router.get('/:id', async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
});

// POST a new ticket
router.post('/', async (req, res, next) => {
  try {
    const ticket = new Ticket({
      summary: req.body.summary,
      description: req.body.description,
      author_id: req.body.author_id
    });
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    next(err);
  }
});

// PUT (update) an existing ticket by id
router.put('/:id', async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    ticket.summary = req.body.summary;
    ticket.description = req.body.description;
    ticket.author_id = req.body.author_id;
    const updatedTicket = await ticket.save();
    res.status(200).json(updatedTicket);
  } catch (err) {
    next(err);
  }
});

// DELETE a ticket by id
router.delete('/:id', async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    await ticket.remove();
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;