import configDotenvPath from "../helpers/dotenv-config.js";
import helperFunctions from "../helpers/helpers.js"
import { getLocationWeatherService } from "../services/weather.services.js";

const {validateRequest } = helperFunctions;
configDotenvPath();

const getWeatherController = async (req, res) => {
    validateRequest(req, res);
    try {
        const weatherData = await getLocationWeatherService(req.params.location);
        return res.status(200).send({ data: weatherData.data });
    }
    catch (err) {
        res.status(err.response.status).send({ error: err });
        return;
    }
}

const weatherControllers = { getWeatherController };

export default weatherControllers;