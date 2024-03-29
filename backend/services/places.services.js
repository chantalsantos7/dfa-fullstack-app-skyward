import configDotenvPath from "../helpers/dotenv-config.js";
import axios from "axios";

configDotenvPath();

export const getPoIForLocationService = async (lon, lat) => {
    try {
        const geoReverseResponse = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&lang=en&format=json&apiKey=${process.env.PLACES_API_KEY}`);
        const place_id = geoReverseResponse.data.results[0].place_id;

        const response = await axios.get(`https://api.geoapify.com/v2/places?categories=tourism,accommodation.hotel&filter=place:${place_id}&lang=en&limit=70&apiKey=${process.env.PLACES_API_KEY}`);
        
        return response;
    }
    catch (err) {
        throw err;
    }
} 