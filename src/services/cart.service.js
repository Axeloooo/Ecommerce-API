import { cartRepository } from "../repositories/cart.repository.js";
import { productRepository } from "../repositories/product.repository.js";
import { BadRequestError } from "../errors/errors.js";

import { Ticket } from "../models/Ticket.js";

import { ticketRepository } from "../repositories/ticket.repository.js";

import { randomUUID } from "crypto";

class CartService {
  async getTicketsByEmail(req) {
    try {
      const email = req.query.email;
      if (!email) {
        throw new BadRequestError("Query parameter 'email' is required.");
      }
      return await ticketRepository.getTicketsByEmail(email);
    } catch (err) {
      console.error("Error in getTicketsByEmail Service.");
      throw err;
    }
  }
  async postPurchase(req) {
    try {
      const { cid } = req.params;

      const cart = await cartRepository.getCartById(cid);

      if (!cart) {
        throw new Error("Cart not found");
      }

      let totalAmount = 0;

      for (let i = 0; i < cart.products.length; i++) {
        const product = cart.products[i];
        const productQuantity = product.quantity;

        if (!product) {
          throw new Error(`Product not found: ${product.product._id}`);
        }

        const newStock = product.product.stock - productQuantity;

        if (newStock >= 0) {
          await productRepository.putProduct(product.product._id, {
            stock: newStock,
          });

          const productSoldFromCart =
            await cartRepository.deleteProductInCartById(
              cid,
              product.product._id
            );

          console.log("product sold from cart");
          console.log(productSoldFromCart);

          totalAmount += product.product.price * productQuantity;
        }
      }

      if (totalAmount === 0 || !req.user || !req.user.email) {
        throw new Error("Invalid purchase parameters");
      }

      const ticket = new Ticket({
        code: randomUUID(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: req.user.email,
      });

      const ticketCreated = await ticketRepository.postTicket(ticket);

      return ticketCreated;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const cartService = new CartService();
