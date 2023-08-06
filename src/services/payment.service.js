import Stripe from "stripe";
import { BadRequestError } from "../errors/errors.js";

class PaymentService {
  #stripe;

  constructor() {
    this.#stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createPaymentIntent(req) {
    try {
      const { total } = req.query;
      if (total) {
        const paymentIntentInfo = {
          amount: total,
          currency: "cad",
        };
        return await this.#stripe.paymentIntents.create(paymentIntentInfo);
      } else {
        throw new BadRequestError("Query parameter 'total' is required.");
      }
    } catch (err) {
      console.error("Error in createPaymentIntent Service.", err);
      throw err;
    }
  }
}

export const paymentService = new PaymentService();
