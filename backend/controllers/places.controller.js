import configDotenvPath from "../helpers/dotenv-config.js";
import helperFunctions from "../helpers/helpers.js"
import { getPoIForLocationService } from "../services/places.services.js";

const { validateRequest } = helperFunctions;
configDotenvPath();

const getPoIForLocationController = async (req, res) => {
    validateRequest(req, res);

    try {
        const response = await getPoIForLocationService(req.params.location);
        console.log(response);
        return res.status(200).send();
    }
    catch (err) {
        return res.status(500).send({ error: err });
    }
}

const placesControllers = { getPoIForLocationController };

export default placesControllers;