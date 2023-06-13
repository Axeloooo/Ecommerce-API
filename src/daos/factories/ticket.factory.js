let ticketDao;

switch (process.env.PERSISTANCE) {
  case "MONGO":
    const { mongoTicketDao } = await import("../mongo/ticket.dao.js");
    ticketDao = mongoTicketDao;
  case "MEMORY":
    const { memoryTicketDao } = await import("../memory/ticket.dao.js");
    ticketDao = memoryTicketDao;
}

export default ticketDao;
