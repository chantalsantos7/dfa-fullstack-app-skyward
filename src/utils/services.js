import axios from "axios";
import dotenv from 'dotenv';

//dotenv.config({ path: 'challenge-4-travel-info-chantalsantos7' + '/../.env.development'});
// export const getWeatherData = async () => {
//     const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=<YOUR API KEY>`);
//     //setWeatherData(response.data);
// }


export const getWeatherService = async (location) => {
    try {
        
        // console.log(meta.env.WEATHER_API_KEY);
        let WEATHER_API_KEY = '9289f7156337cd9fc1dfd709ac9e441f';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${WEATHER_API_KEY}`);
        return response.data;
    } 
    catch (error) {
        console.error(`There was a problem with your fetch operation: `,
        error.message
        );
        return error.message ? error : new Error("Network Error");
    }
};