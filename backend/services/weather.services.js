import configDotenvPath from "../helpers/dotenv-config.js";
import axios from 'axios';

configDotenvPath();
export const getLocationWeatherService = async (location) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.WEATHER_API_KEY}`);
        return response;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};