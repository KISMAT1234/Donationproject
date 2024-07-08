import express from 'express'
import SearchController from "../controller/SearchController.js"
import authenticate from '../middleware/Authenticate.js';

const searchRouter = express.Router();

const searchInstance = new SearchController();

searchRouter.post("/",authenticate,searchInstance.postSearch);
searchRouter.get("/",authenticate,searchInstance.getSearch);
searchRouter.get("/:value",searchInstance.getOnTimeSearch);
searchRouter.delete("/:id",authenticate,searchInstance.deleteSearch);


export default searchRouter

