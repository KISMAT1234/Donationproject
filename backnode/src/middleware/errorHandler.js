import Logger from "../logger/winstonLogger.js";

const errorHandler = (err, req, res, next) => {
    if(process.env.NODE_ENV === 'production'){
        developmentErrorHandler(err, req, res, next);
    } else {
        productionErrorHandler(err, req, res, next);
    }
 }

 const developmentErrorHandler = () => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Opps Something went wrong'
  var response = { success: false, message: err.message, stack: err.stack }
  res.status(err.statusCode).send(response)
 }

 const productionErrorHandler = (err, req) => {

  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Opps Something went wrong'
  var response = { success: false, message: err.message }
  Logger.info({ message: err.message })
  res.status(err.statusCode).send(response)

 }



// const handleProdError = (err, res) => {
//     err.statusCode = err.statusCode || 500
//     err.message = err.message || 'Opps Something went wrong'
//     var response = { success: false, message: err.message }
//     // Logger.info({ message: err.message })
//     res.status(err.statusCode).send(response)
//   }
  
//   const handleDevError = (err, res) => {
//     err.statusCode = err.statusCode || 500
//     err.message = err.message || 'Opps Something went wrong'
//     var response = { success: false, message: err.message, stack: err.stack }
//     res.status(err.statusCode).send(response)
//   }
  
//   const errorHandler = (err, req, res, next) => {
//     if (process.env.NODE_ENV === 'development') {
//       handleDevError(err, res)
//     } else {
//       handleProdError(err, res)
//     }
//   }

  export default errorHandler;