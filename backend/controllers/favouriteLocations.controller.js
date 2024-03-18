import configDotenvPath from '../helpers/dotenv-config.js';
import helperFunctions from '../helpers/helpers.js';
import { addFavouritesService } from '../services/favourites.services.js';

const { validateRequest } = helperFunctions;
configDotenvPath();

const fetchFavouritesController = async (req, res) => {
    validateRequest(req, res);
    console.log("reached");
}

const addFavouritesController = async (req, res) => {
    validateRequest(req, res);

    try {
        const faves = await addFavouritesService(req);
        return res.status(201).send({ message: `Successfully created favourite locations` });
    }
    catch (err) {
        res.status(500).send({ message: `internal error is blocking add to favourites`, error: err });
        return;
    }
}


const favouriteLocationsControllers = { fetchFavouritesController, addFavouritesController };

export default favouriteLocationsControllers;