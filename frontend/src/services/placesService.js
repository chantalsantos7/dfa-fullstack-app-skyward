import axios from 'axios';

export const getPoIForLocationService = async (longitude, latitude) => {
    const response = await axios.get(`http://localhost:5000/places/get-places/${longitude}/${latitude}`);
    // console.log(response);

    //parse the response to get the features.properties of each feature 
    const placesArray = response.data.features.map(feature => feature.properties);
    return placesArray;
};