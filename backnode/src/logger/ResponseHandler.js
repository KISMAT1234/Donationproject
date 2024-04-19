
class Handler {

  responseHandler(res, httpStatusCode,message,data){

     if(httpStatusCode === 200 || httpStatusCode === 201 || httpStatusCode === 202){
      this.successResponse(res, httpStatusCode,message,data);
     }else{
       this.errorResponse(res, httpStatusCode,message,data);
     }
  }

   successResponse(res,httpStatusCode,message,data){
      const response = {
         success:true,
         message: message || 'Success',
         data: data || [],
      }
      let statusCode = httpStatusCode || 200
      res.status(statusCode).send(response)
      }

      errorResponse(res,httpStatusCode,message){
         var response = {
            success: false,
            message: message || "Internal Server Error",
          };
          let statusCode = httpStatusCode || 500;
          res.status(statusCode).send(response);
      }
}

export default Handler;
