import express from 'express';
import UploadController from "../controller/UploadController.js"


const upRouter = express.Router();

const uploadInstance = new UploadController;

upRouter.post('/',uploadInstance.store)

export default upRouter;