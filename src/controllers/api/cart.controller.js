import { cartRepository } from "../../repositories/cart.repository.js";
import { cartService } from "../../services/cart.service.js";

import {
  InternalServerError,
  NotFoundError,
  BadRequestError,
} from "../../errors/errors.js";

export async function getCarts(req, res, next) {
  try {
    const carts = await cartRepository.getCarts();
    if (!carts) {
      return next(new NotFoundError("Not Found"));
    }
    res.status(200).json(carts);
  } catch (err) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function getCartById(req, res, next) {
  try {
    const cid = req.params.cid;
    const cart = await cartRepository.getCartById(cid);
    if (!cart) {
      return next(new NotFoundError("Not Found"));
    }
    res.status(200).json(cart);
  } catch (err) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function getTicketsByEmail(req, res, next) {
  try {
    const response = await cartService.getTicketsByEmail(req);
    if (!response) {
      throw new InternalServerError("Error retrieving tickets.");
    }
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

export async function postCart(req, res, next) {
  try {
    const cart = await cartRepository.postCart();
    if (!cart) {
      return next(new BadRequestError("Client Error"));
    }
    res.status(201).json(cart);
  } catch (err) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function postProductInCartById(req, res, next) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const product = await cartRepository.postProductInCartById(cid, pid);
    if (!product) {
      return next(new NotFoundError("Not Found Error"));
    }
    res.status(201).json(product);
  } catch (err) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function postPurchase(req, res, next) {
  try {
    const receipt = await cartService.postPurchase(req);
    if (!receipt) {
      return next(new NotFoundError("Not Found Error"));
    }
    res.status(201).json(receipt);
  } catch (err) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function putCartById(req, res, next) {
  try {
    const cid = req.params.cid;
    const data = req.body;
    const cart = await cartRepository.putCartById(cid, data);
    if (!cart) {
      return next(new BadRequestError("Client Error"));
    }
    res.status(200).json(cart);
  } catch (err) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function putProductInCartById(req, res, next) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const data = req.body;
    const product = await cartRepository.putProductInCartById(cid, pid, data);
    if (!product) {
      return next(new NotFoundError("Not Found Error"));
    }
    res.status(200).json(product);
  } catch (err) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function deleteCartById(req, res, next) {
  try {
    const cid = req.params.cid;
    const cart = await cartRepository.deleteCartById(cid);
    if (!cart) {
      return next(new NotFoundError("Not Found Error"));
    }
    res.status(200).json(cart);
  } catch (err) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function deleteProductInCartById(req, res, next) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const product = await cartRepository.deleteProductInCartById(cid, pid);
    if (!product) {
      return next(new NotFoundError("Not Found Error"));
    }
    res.status(200).json(product);
  } catch (err) {
    return next(new InternalServerError("Server Error"));
  }
}
