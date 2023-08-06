// CUSTOM ERRORS

// HTTP CODES
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "Bad Request Error";
  }
}
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Not Found Error";
  }
}
export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "Internal Server Error";
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
