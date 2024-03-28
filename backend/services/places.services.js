import configDotenvPath from "../helpers/dotenv-config.js";
import axios from "axios";

configDotenvPath();

export const getPoIForLocationService = async (lon, lat) => {
    //requesting for 
    //https://api.geoapify.com/v2/places?categories=tourism.attractions&filter=circle:${lon},${lat},3000&bias=proximity:-0.07071648508463113,51.50848194136378&limit=20&apiKey=${process.env.PLACES_API_KEY}
    try {
        //TODO: Implement geolocating API to get better coordinates for this search
        //pass the coordinates I get to reverse geolocating API to get a placeID for the city, can then set the city boundaries as a filter for the Places API
        
        console.log(`lon: ${lon}`);
        console.log(`lat: ${lat}`);
        const geoReverseResponse = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&lang=en&format=json&apiKey=${process.env.PLACES_API_KEY}`);
        //axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=59.3326&lon=18&format=json&apiKey=27bc40c6535e48ecb9c3f4962ed75526`);
        // 
        //
        // console.log(geoReverseResponse.data.results);
        // console.log();
        const place_id = geoReverseResponse.data.results[0].place_id;
        console.log(place_id);
        const radiusMetres = 10000;
       // 

        // const response = await axios.get(`https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},${radiusMetres}&bias=proximity:9.1896346,45.4641943&limit=20&apiKey=${process.env.PLACES_API_KEY}`);
        const response = await axios.get(`https://api.geoapify.com/v2/places?categories=commercial,tourism,accommodation.hotel&filter=place:${place_id}&lang=en&limit=40&apiKey=${process.env.PLACES_API_KEY}`);
        // console.log(response.data);
       console.log(response);
        return response;
    }
    catch (err) {
        throw err;
    }
} 