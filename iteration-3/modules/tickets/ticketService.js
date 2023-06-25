// modules/tickets/ticketService.js

const tickets = [];

function getAllTickets() {
  return tickets;
}

function getTicketById(id) {
  return tickets.find(ticket => ticket.id === id);
}

function createTicket(ticket) {
  const newTicket = { id: tickets.length + 1, ...ticket };
  tickets.push(newTicket);
  return newTicket;
}

function updateTicket(id, updatedTicket) {
  const index = tickets.findIndex(ticket => ticket.id === id);
  if (index === -1) {
    return null;
  }
  const updated = { ...tickets[index], ...updatedTicket };
  tickets[index] = updated;
  return updated;
}

function deleteTicket(id) {
  const index = tickets.findIndex(ticket => ticket.id === id);
  if (index === -1) {
    return null;
  }
  const deleted = tickets.splice(index, 1);
  return deleted[0];
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};