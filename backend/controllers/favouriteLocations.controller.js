import configDotenvPath from '../helpers/dotenv-config.js';
import helperFunctions from '../helpers/helpers.js';
import { addFavouritesService, addNewLocationService, deleteLocationService, fetchFavouritesService } from '../services/favourites.services.js';

const { validateRequest } = helperFunctions;
configDotenvPath();

const fetchFavouritesController = async (req, res) => {
    validateRequest(req, res);

    try {
        const favouritesEntry = await fetchFavouritesService(req.body.userId);
        // console.log(favouritesEntry)
        return res.status(200).send({ message: "Found favourites", favourites: favouritesEntry.favourites });
    }
    catch (err) {
        //if there is no favourites, it's alright as it probably hasn't been added to yet, so call the POST rather than patch
        if (err.message === "Favourites not yet created") {
            return res.status(200).send({ message: "No favourites saved yet", favourites: [] });
        }

        res.status(500).send({ message: `internal error is blocking fetch favourites`, error: err });
        return;
    }
}

const addFavouritesController = async (req, res) => {
    validateRequest(req, res);

    try {
        const faves = await addFavouritesService(req);
        return res.status(201).send({
            message: `Successfully created favourite locations`,
            favourites: faves.favourites
        });
    }
    catch (err) {
        res.status(500).send({ message: `internal error is blocking add to favourites`, error: err });
        return;
    }
}

const addNewLocationToFavouritesController = async (req, res) => {
    validateRequest(req, res);

    try {
        const updatedFavourites = await addNewLocationService(req);
        return res.status(200)
            .send({
                message: "Successfully added new location to favourites",
                favourites: updatedFavourites.favourites
            });
    }
    catch (err) {

        if (err.message == `Could not find a favourites entry for that user`)
        {
            return res.status(404).send({ message: err.message });
        }
        res.status(500).send({ message: `internal error is blocking add to favourites`, error: err });
        return;
    }
}

const deleteLocationFromFavouritesController = async (req, res) => {
    validateRequest(req, res);

    try {
        const updatedFavourites = await deleteLocationService(req);
        return res.status(200).send({ message: `Successfully deleted location from favourites`, favourites: updatedFavourites.favourites })
    }
    catch (err) {
        if (err.message === `That locations was not in the user's favourites` ||
            err.message === "No favourites entry found for that user id") {
            return res.status(404).send({ message: err.message });
        }
        return res.status(500).send({ message: `internal error is blocking delete from favourites`, error: err });

    }
}


const favouriteLocationsControllers = { fetchFavouritesController, addFavouritesController, addNewLocationToFavouritesController, deleteLocationFromFavouritesController };

export default favouriteLocationsControllers;