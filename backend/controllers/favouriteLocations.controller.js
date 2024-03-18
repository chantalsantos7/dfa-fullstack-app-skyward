import configDotenvPath from '../helpers/dotenv-config.js';
import helperFunctions from '../helpers/helpers.js';

const { validateRequest } = helperFunctions;
configDotenvPath();

const fetchFavouritesController = async (req, res) => {
    validateRequest(req, res);
    console.log("reached");
}


const favouriteLocationsControllers = { fetchFavouritesController };

export default favouriteLocationsControllers;