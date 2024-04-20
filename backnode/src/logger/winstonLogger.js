import winston,{format} from "winston";
// import {EnvConfiguration.LOG_LEVEL} from ""
const {printf, timestamp, combine, colorize, errors, json} = format;

const myFormat = printf(({ level, message, stack, timestamp }) => {
    return `${timestamp}  ${level}: ${stack || message}`;
});

const Loglevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  }


let Logger;
if (process.env.NODE_ENV == 'development') {

   Logger = winston.createLogger({
    level:Loglevels,     
    format: combine(
        colorize(),
        timestamp({format: "yyyy-MM-dd HH:mm:ss"}),
        errors({stack: true}),
        json(),
        // myFormat
    ),   // Text format for logging       
    transports:[
        new winston.transports.File({
            filename:"log/error_log.txt",
            level:"error",
        })
    ]
});
}else{
     Logger = winston.createLogger({
        label: "warn",
        transports: [new winston.transports.Console()],
        format: winston.format.simple(),
      })
}

// logger.error("error from logger")
// Logger.warn("warning message");

export default Logger
