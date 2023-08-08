import ticketDao from "../daos/factories/ticket.factory.js";

class TicketRepository {
  #ticketDao;

  constructor(ticketDao) {
    this.#ticketDao = ticketDao;
  }

  async getTicketById(tid) {
    try {
      const searchedTicket = await this.#ticketDao.getTicketById(tid);
      return searchedTicket;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTicketsByEmail(email) {
    return this.#ticketDao.getTicketsByEmail(email);
  }

  async postTicket(ticket) {
    try {
      const ticketCreated = await this.#ticketDao.postTicket(ticket);
      return ticketCreated;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const ticketRepository = new TicketRepository(ticketDao);
