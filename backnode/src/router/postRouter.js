import express from 'express'
import PostController from "../controller/PostController.js"
import FileUpload from '../multerfile/Upload.js';
import authenticate from "../middleware/Authenticate.js"



const postRouter = express.Router();

let fPInstance = new FileUpload();
let upload = fPInstance.custom_upload("uploads/posts")

const routerInstance = new PostController();

postRouter.post('/',authenticate, upload.single('image'), routerInstance.insert)
postRouter.get('/', routerInstance.content)
postRouter.get('/:id', routerInstance.donate)

export default postRouter;
