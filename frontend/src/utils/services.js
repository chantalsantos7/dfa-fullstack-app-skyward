import axios from "axios";
import dotenv from 'dotenv';

//dotenv.config({ path: 'challenge-4-travel-info-chantalsantos7' + '/../.env.development'});
// export const getWeatherData = async () => {
//     const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=<YOUR API KEY>`);
//     //setWeatherData(response.data);
// }

export const saveFavouriteLocationService = (location) => {
    let savedLocations = JSON.parse(localStorage.getItem('favouriteLocations')) || [];
    if (!savedLocations.includes(location)) {  
        savedLocations.push(location);
         localStorage.setItem('favouriteLocations', JSON.stringify(savedLocations));
    }    
}

export const getFavouriteLocationsService = () => {
    //get favourite locations from the server if user is logged in

    return JSON.parse(localStorage.getItem('favouriteLocations'));
}

export const removeFromFavouriteLocationsService = (location) => {
    let savedLocations = JSON.parse(localStorage.getItem('favouriteLocations'));
    savedLocations = savedLocations.filter(savedLocation => savedLocation !== location);
    localStorage.setItem('favouriteLocations', JSON.stringify(savedLocations));
}