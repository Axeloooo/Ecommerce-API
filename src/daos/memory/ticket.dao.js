import fs from "fs";

class TicketDao {
  #ticket;

  constructor() {
    this.#ticket = [];
  }

  async getTicketById(tid) {
    try {
      const data = fs.readFileSync("./src/database/ticket.json", "utf8");
      this.#ticket = JSON.parse(data);
      const ticket = this.#ticket.find((item) => item._id == tid);
      return ticket;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postTicket(ticket) {
    try {
      const data = fs.readFileSync("./src/database/ticket.json", "utf8");
      this.#ticket = JSON.parse(data);
      const newTicket = {
        _id: this.#ticket.length + 1,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        user: ticket.user,
      };
      this.#ticket.push(newTicket);
      fs.writeFileSync(
        "./src/database/ticket.json",
        JSON.stringify(this.#ticket),
        "utf8"
      );
      return newTicket;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const memoryTicketDao = new TicketDao();
