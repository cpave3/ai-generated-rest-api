// modules/tickets/ticketController.js

const express = require('express');
const router = express.Router();
const ticketService = require('./ticketService');

// Get all tickets
const getAllTickets = (req, res) => {
  const tickets = ticketService.getAllTickets();
  res.send(tickets);
};

// Get ticket by id
const getTicketById = (req, res) => {
  const id = req.params.id;
  const ticket = ticketService.getTicketById(id);
  res.send(ticket);
};

// Create a new ticket
const createTicket = (req, res) => {
  const { summary, description, author_id } = req.body;
  const ticket = ticketService.createTicket(summary, description, author_id);
  res.send(ticket);
};

// Update a ticket
const updateTicket = (req, res) => {
  const id = req.params.id;
  const { summary, description, author_id } = req.body;
  const ticket = ticketService.updateTicket(id, summary, description, author_id);
  res.send(ticket);
};

// Delete a ticket
const deleteTicket = (req, res) => {
  const id = req.params.id;
  ticketService.deleteTicket(id);
  res.sendStatus(204);
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};