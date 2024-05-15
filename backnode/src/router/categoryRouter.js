import express from 'express'
import CategoryController from "../controller/CategoryController.js"
import authenticate from '../middleware/Authenticate.js';


const categoryRouter = express.Router();
const categoryInstance = new CategoryController();


categoryRouter.get("/:categoryName",authenticate,categoryInstance.category)


export default categoryRouter;
