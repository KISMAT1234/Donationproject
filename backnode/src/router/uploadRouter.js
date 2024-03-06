import express from 'express'
import UploadController from "../controller/UploadController.js"

const uploadRouter = express.Router();

const routerInstance = new UploadController();

uploadRouter.post('/', routerInstance.insert)
uploadRouter.get('/', routerInstance.content)

export default uploadRouter;