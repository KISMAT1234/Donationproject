import Logger from "../logger/winstonLogger.js";

const errorHandler = (err, req, res, next) => {
    if(process.env.NODE_ENV === 'development'){
        productionErrorHandler(err, req, res, next);
    } else {
        developmentErrorHandler(err, req, res, next);
    }
 }

 const developmentErrorHandler = () => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Opps Something went wrong'
  var response = { success: false, message: err.message, stack: err.stack }
  Logger.error({ message: err.message })
  res.status(err.statusCode).send(response)
 }

 const productionErrorHandler = (err, req) => {
    console.log("start from here of error")
    console.log(err.message,'error in production')
    Logger.error({ message: err.message })

//   err.statusCode = err.statusCode || 500
//   err.message = err.message || 'Opps Something went wrong'
//   var response = { success: false, message: err.message }
//   Logger.error({ message: err.message })
//   res.status(err.statusCode).send(response)

 }



  export default errorHandler;