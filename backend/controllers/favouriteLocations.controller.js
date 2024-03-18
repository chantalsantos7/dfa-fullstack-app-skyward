import configDotenvPath from '../helpers/dotenv-config.js';
import helperFunctions from '../helpers/helpers.js';
import { addFavouritesService, fetchFavouritesService } from '../services/favourites.services.js';

const { validateRequest } = helperFunctions;
configDotenvPath();

const fetchFavouritesController = async (req, res) => {
    validateRequest(req, res);
    
    try {
        const favouritesEntry = await fetchFavouritesService(req.body.userId);
        console.log(favouritesEntry)
        return res.status(200).send({ message: "Found favourites", favourites: favouritesEntry.favourites });
    }
    catch (err)
    {
        if (err.message === "Favourites not yet created") {
            return res.status(200).send({ message: "No favourites saved yet", favourites: []});
        }

        //if there is no favourites, it's alright as it probably hasn't been added to yet, so call the POST rather than patch
        res.status(500).send({ message: `internal error is blocking fetch favourites`, error: err });
        return;
    }
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