import configDotenvPath from "../helpers/dotenv-config.js";
import helperFunctions from "../helpers/helpers.js"
import { getLocationWeatherService } from "../services/weather.services.js";

const {validateRequest } = helperFunctions;
configDotenvPath();

const getWeatherController = async (req, res) => {
    validateRequest(req, res);
    console.log(`Weather request: ${req.params.location}`)
    try {
        const weatherData = await getLocationWeatherService(req.params.location);
        return res.status(200).send({ data: weatherData.data });
    }
    catch (err) {
        res.status(500).send({ error: err });
        return;
    }
}

const weatherControllers = { getWeatherController };

export default weatherControllers;