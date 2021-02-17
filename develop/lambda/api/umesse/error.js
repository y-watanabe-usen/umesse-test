'use strict';

class UMesseError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
    get name() {
        return this.constructor.name;
    }
}

// Middle error handling.
//class PlatformError extends UMesseError { }
class AppError extends UMesseError {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
/// Error Handling. 
class BadRequestError extends AppError {
    constructor(message) {
        super(400, message);
    }
}
class NotFoundError extends AppError {
    constructor(message) {
        super(404, message);
    }
}
class AWSError extends AppError {
    constructor(awserror) {
        super(500, awnserror.message);
    }
}
class InternalServerError extends AppError {
    constructor(message) {
        super(500, message);
    }
}
class UnhandledError extends InternalServerError { }

module.exports = {
    UMesseError,
    AppError,
    BadRequestError,
    NotFoundError,
    InternalServerError,
    AWSError,
    UnhandledError
}