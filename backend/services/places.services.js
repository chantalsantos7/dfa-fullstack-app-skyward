import configDotenvPath from "../helpers/dotenv-config.js";
import axios from "axios";

configDotenvPath();

export const getPoIForLocationService = async (lon, lat) => {
    //requesting for 
    //https://api.geoapify.com/v2/places?categories=tourism.attractions&filter=circle:${lon},${lat},3000&bias=proximity:-0.07071648508463113,51.50848194136378&limit=20&apiKey=${process.env.PLACES_API_KEY}
    try {
        //TODO: Implement geolocating API to get better coordinates for this search
        //pass the coordinates I get to reverse geolocating API, then use a "near this address" filter on the places API call
        const radiusMetres = 10000;
       
        // const response = await axios.get(`https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},${radiusMetres}&bias=proximity:9.1896346,45.4641943&limit=20&apiKey=${process.env.PLACES_API_KEY}`);
        const response = await axios.get(`https://api.geoapify.com/v2/places?categories=tourism,accommodation.hotel&filter=circle:${lon},${lat},${radiusMetres}&bias=proximity:${lon},${lat}&limit=30&apiKey=${process.env.PLACES_API_KEY}`);
        return response;
    }
    catch (err) {
        throw err;
    }
} 