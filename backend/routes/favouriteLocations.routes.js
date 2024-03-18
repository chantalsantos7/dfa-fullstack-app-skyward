import express from "express";
import { body } from "express-validator";
import favouriteLocationsControllers from "../controllers/favouriteLocations.controller.js";

const favouriteLocationsRouter = express.Router();

const { fetchFavouritesController, addFavouritesController } = favouriteLocationsControllers;

favouriteLocationsRouter.post('/fetch-all', [
    body(`userId`).notEmpty()
], fetchFavouritesController);

//route for when there is initially no favourites
favouriteLocationsRouter.post('/add-favourites', [
    body(`userId`).notEmpty(),
    body(`favourites`).isArray()
], addFavouritesController );

favouriteLocationsRouter.patch('/add-location', [], );

export default favouriteLocationsRouter;