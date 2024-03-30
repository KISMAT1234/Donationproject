import winston from "winston";

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports:[new winston.tranports.Console()]
});

logger.error("error from logger")