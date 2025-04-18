export class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = this.constructor.name; // Sets the name of the error to the class name
      this.statusCode = statusCode;
    }
  }

export class NotFoundException extends CustomError {
    constructor(message = 'Resource not found') {
        super(message, 404); // HTTP Status for Not Found
    }
}

export class BadRequestException extends CustomError {
    constructor(message = 'Bad request') {
        super(message, 400); // HTTP Status for Bad Request
    }
}

export class UnauthorizedException extends CustomError {
    constructor(message = 'Unauthorized') {
        super(message, 401); // HTTP Status for Unauthorized
    }
}

export class ForbiddenException extends CustomError {
    constructor(message = 'Forbidden') {
        super(message, 403); // HTTP Status for Forbidden
    }
}

export class InternalServerErrorException extends CustomError {
    constructor(message = 'Internal Server Error') {
        super(message, 500); // HTTP Status for Internal Server Error
    }
}
