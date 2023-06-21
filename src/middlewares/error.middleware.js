import { ServerError, NotFoundError, ClientError } from "../errors/errors.js";

export function errorHandler(err, req, res, next) {
  process.env.NODE_ENV === "DEV" ? console.error(err) : null;

  if (err instanceof ClientError) {
    res.status(400).json({
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        message: err.message,
      },
    });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({
      statusCode: 404,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        message: err.message,
      },
    });
  } else if (err instanceof ServerError) {
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        error: err.message,
      },
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        error: err.message,
      },
    });
  }
}
