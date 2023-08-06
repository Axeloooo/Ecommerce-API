import {
  InternalServerError,
  NotFoundError,
  BadRequestError,
} from "../errors/errors.js";

export function errorHandler(err, req, res, next) {
  process.env.NODE_ENV === "DEV" ? console.error(err) : null;

  if (err instanceof BadRequestError) {
    res.status(400).json(err.message);
  } else if (err instanceof NotFoundError) {
    res.status(404).json(err.message);
  } else if (err instanceof InternalServerError) {
    res.status(500).json(err.message);
  } else {
    res.status(500).json(err.message);
  }
}
