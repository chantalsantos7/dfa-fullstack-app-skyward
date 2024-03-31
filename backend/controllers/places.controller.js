import configDotenvPath from "../helpers/dotenv-config.js";
import helperFunctions from "../helpers/helpers.js"
import { getPoIForLocationService } from "../services/places.services.js";

const { validateRequest } = helperFunctions;
configDotenvPath();

const getPoIForLocationController = async (req, res) => {
    validateRequest(req, res);
    const { lon, lat } = req.params;
    try {
        const response = await getPoIForLocationService(lon, lat);
        // console.log(response);
        return res.status(200).send({ features: response.data.features});
    }
    catch (err) {
        return res.status(err.response.status).send({ error: err });
    }
}

const placesControllers = { getPoIForLocationController };

export default placesControllers;