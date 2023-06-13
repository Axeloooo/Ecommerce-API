export class ClientError extends Error {
  constructor(message) {
    super(message);
    this.name = "Client Error";
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Not Found Error";
  }
}

export class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "Server Error";
  }
}
