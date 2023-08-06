import { paymentService } from "../../services/payment.service.js";
import { InternalServerError } from "../../errors/errors.js";

export async function postPayment(req, res, next) {
  try {
    const response = await paymentService.createPaymentIntent(req);
    if (!response) {
      throw new InternalServerError("Error creating payment intent");
    }
    console.log(response);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}
