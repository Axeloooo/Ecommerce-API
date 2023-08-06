import { Router } from "express";
import * as paymentsController from "../../controllers/api/payments.controller.js";

export const paymentsApiRouter = Router();

paymentsApiRouter.post("/payment-intents", paymentsController.postPayment);
