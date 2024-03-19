import express from "express";
import { body } from "express-validator";
import favouriteLocationsControllers from "../controllers/favouriteLocations.controller.js";

const favouriteLocationsRouter = express.Router();

const { fetchFavouritesController, addFavouritesController, addNewLocationToFavouritesController, deleteLocationFromFavouritesController } = favouriteLocationsControllers;

favouriteLocationsRouter.post('/fetch-all', [
    body(`userId`).notEmpty()
], fetchFavouritesController);

//route for when there is initially no favourites
favouriteLocationsRouter.post('/add-favourites', [
    body(`userId`).notEmpty(),
    body(`favourites`).isArray().withMessage('Favourites must be an array')
        .custom((value) => {
            return value.every((item) => typeof item === 'string');
        }).withMessage('All favourites must be strings')
], addFavouritesController);

favouriteLocationsRouter.patch('/add-location', [
    body(`userId`).notEmpty(),
    body(`location`).notEmpty().isString(),
], addNewLocationToFavouritesController);

favouriteLocationsRouter.patch('/delete-location', [
    body(`userId`).notEmpty(),
    body(`location`).notEmpty().isString(),
], deleteLocationFromFavouritesController);

export default favouriteLocationsRouter;