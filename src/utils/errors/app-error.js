class AppError extends Error {
    constructor(message, statusCode,name,explaination) {
        super();
        this.statusCode = statusCode;
        this.explanation = message;
        this.name = name;
        this.explanation = explaination
        
    }
}

module.exports = AppError;