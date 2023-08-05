import { cartRepository } from "../repositories/cart.repository.js";

export async function role(req, res, next) {
  if (
    req.body.email === "adminCoder@coder.com" &&
    req.body.password === "adminCod3r123"
  ) {
    const { _id } = await cartRepository.postCart();
    req.body["cid"] = _id;
    req.body["role"] = "admin";
    next();
  } else {
    const { _id } = await cartRepository.postCart();
    req.body["cid"] = _id;
    req.body["role"] = "user";
    next();
  }
}
