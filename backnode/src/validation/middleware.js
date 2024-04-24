import Handler from "../logger/ResponseHandler.js"
const responseInstance = new Handler();

const validate = (schema) => async(req, res, next) => {
    try{
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody;
        next()
    }catch(err){
        // const errMessage = err.errors[0].message
        // console.log(err,'err message');
        // console.log(err);
        next(err)
        return responseInstance.responseHandler(res,500,'error')
        
    }
}

export default validate

