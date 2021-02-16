'use strict';

class UMesseError /*extends Error */ {
    constructor(message) {
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
        this.statusCode= statusCode;
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
class UnhandledError extends AppError {
    constructor(message) {
        super(500, message);
    }
}

module.exports = {
    AppError,
    BadRequestError,
    NotFoundError,
    UnhandledError
}