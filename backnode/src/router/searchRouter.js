import express from 'express'
import SearchController from "../controller/SearchController.js"
import authenticate from '../middleware/Authenticate.js';

const searchRouter = express.Router();

const searchInstance = new SearchController();

searchRouter.post("/",authenticate,searchInstance.postSearch);
searchRouter.get("/",searchInstance.getSearch);
searchRouter.delete("/",searchInstance.deleteSearch);


export default searchRouter

