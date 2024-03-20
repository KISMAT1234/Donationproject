import express from 'express'
import UploadController from "../controller/UploadController.js"
import FileUpload from '../multerfile/Upload.js';


const uploadRouter = express.Router();

let fPInstance = new FileUpload();
let upload = fPInstance.custom_upload("uploads/posts")

const routerInstance = new UploadController();

uploadRouter.post('/',upload.single('image'), routerInstance.insert)
uploadRouter.get('/', routerInstance.content)
uploadRouter.get('/:id', routerInstance.donate)

export default uploadRouter;