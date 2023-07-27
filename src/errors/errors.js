// CUSTOM ERRORS

// HTTP CODES
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

// MONGO ERRORS
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "Validation Error";
  }
}

// USERS DAO
export class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "User Not Found Error";
  }
}
export class UsersNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Users Not Found Error";
  }
}
