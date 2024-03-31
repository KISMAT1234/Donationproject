class ResponseHandler{
   successResponse(res,httpStatusCode,message,data){
      const response = {
         success:true,
         message: message || 'Success',
         data: data || [],
      }
      let statusCode = httpStatusCode || 200
      res.status(statusCode).send(response)
      }
}

export default ResponseHandler;
