class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // sets the error message
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
