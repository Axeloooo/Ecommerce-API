let ticketDao;

if (process.env.PERSISTANCE === "MONGO") {
  const { mongoTicketDao } = await import("../mongo/ticket.dao.js");
  ticketDao = mongoTicketDao;
} else if (process.env.PERSISTANCE === "MEMORY") {
  const { memoryTicketDao } = await import("../memory/ticket.dao.js");
  ticketDao = memoryTicketDao;
}

export default ticketDao;
