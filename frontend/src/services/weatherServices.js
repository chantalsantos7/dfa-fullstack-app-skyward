import axios from "axios";

export const getWeatherService = async (location) => {
    const encodedLocation = encodeURIComponent(location);
    try {
        const response = await axios.get(`http://localhost:5000/weather/get-location-weather/${encodedLocation}`);
        // console.log(response.data);
        return response.data.data;
    } 
    catch (error) {
        console.error(`There was a problem with your fetch operation: `,
        error.message
        );
        return error.message ? error : new Error("Network Error");
    }
};