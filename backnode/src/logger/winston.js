import winston from "winston";

const logger = winston.createLogger({
    level:"warn",
    format: winston.format.simple(),
    transports:[new winston.transports.Console()]
});

logger.error("error from logger")