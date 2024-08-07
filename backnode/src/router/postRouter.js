import express from 'express'
import PostController from "../controller/PostController.js"
import FileUpload from '../config/Upload.js';
import authenticate from "../middleware/Authenticate.js"



const postRouter = express.Router();

let fPInstance = new FileUpload();
let upload = fPInstance.custom_upload("uploads/posts")

const routerInstance = new PostController();

postRouter.post('/',authenticate, upload.single('image'), routerInstance.insert)
postRouter.get('/',authenticate, routerInstance.content)
postRouter.get('/:id', routerInstance.donate)
postRouter.delete('/:id',authenticate, routerInstance.deletePost)

export default postRouter;
