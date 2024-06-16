import express from 'express'
import NotificationController from "../controller/NotificationController.js"
import authenticate from '../middleware/Authenticate.js';

const notificationRouter = express.Router();

const notificationInstance = new NotificationController();

notificationRouter.get("/",authenticate,notificationInstance.getNotification);


export default notificationRouter;