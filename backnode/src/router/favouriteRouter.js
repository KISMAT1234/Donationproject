import express from 'express'
import authenticate from '../middleware/Authenticate.js';
import FavouriteController from '../controller/FavouriteController.js';

const favouriteRouter = express.Router()
const favouriteInstance = new FavouriteController();

favouriteRouter.post("/:id",authenticate, favouriteInstance.addToCart)

export default favouriteRouter;

