const{ StatusCodes } = require('http-status-codes')

class ServiceError extends Error{
    constructor(
        message = "Something went wrong",
        explaination = "Service layer error",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ){
        this.name = "ServiceError";
        this.message = message;
        this.explaination = explaination;
        this.statusCode = statusCode;

    }
}

module.exports = ServiceError;