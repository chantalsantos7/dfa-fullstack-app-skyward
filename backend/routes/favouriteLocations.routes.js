import express from "express";
import { body } from "express-validator";
import favouriteLocationsControllers from "../controllers/favouriteLocations.controller.js";

const favouriteLocationsRouter = express.Router();

const { fetchFavouritesController } = favouriteLocationsControllers;

favouriteLocationsRouter.post('/fetch-all', [
    body(`userId`).notEmpty()
], fetchFavouritesController);

export default favouriteLocationsRouter;