// routes/ticket.js

const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

// GET all tickets
router.get('/', ticketController.getAllTickets);

// GET a ticket by id
router.get('/:id', ticketController.getTicketById);

// POST a new ticket
router.post('/', authMiddleware, validationMiddleware, ticketController.createTicket);

// PUT an existing ticket
router.put('/:id', authMiddleware, validationMiddleware, ticketController.updateTicket);

// DELETE a ticket by id
router.delete('/:id', authMiddleware, ticketController.deleteTicket);

module.exports = router;