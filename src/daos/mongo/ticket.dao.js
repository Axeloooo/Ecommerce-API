import { Schema, model } from "mongoose";

class TicketDao {
  #ticketModel;

  constructor(ticketModel) {
    this.#ticketModel = ticketModel;
  }

  async getTicketById(tid) {
    try {
      const searchedTicket = await this.#ticketModel.findById(tid);
      return searchedTicket;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTicketsByEmail(email) {
    try {
      const res = await this.#ticketModel.find({ purchaser: email });
      return res;
    } catch (err) {
      console.error("Error in getTicketByEmail", err);
      throw err;
    }
  }

  async postTicket(ticket) {
    try {
      const ticketCreated = await this.#ticketModel.create({
        code: ticket.code,
        purchase_datetime: ticket.purchase_datetime,
        amount: ticket.amount,
        purchaser: ticket.purchaser,
      });
      return ticketCreated;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const ticketsCollection = "tickets";

const ticketSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    purchase_datetime: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const ticketModel = model(ticketsCollection, ticketSchema);

export const mongoTicketDao = new TicketDao(ticketModel);
