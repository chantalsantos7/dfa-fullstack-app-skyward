import axios from "axios";
import { verifyTokenService } from "./authServices";

export const getFavouriteLocationsFromDbService = async (authToken) => {
    const FETCH_FAVES_ROUTE = "http://localhost:5000/favourite-locations/fetch-all";
    
    //send a verification request for the authToken before getting the saved locations;
    try {
        const verifyTokenResponse = await verifyTokenService(authToken);
        if (verifyTokenResponse.status === 422) 
        {
            throw new Error(`cannot verify request`);
        }
        //get back userId from the verified token
        const fetchLocationsReq = {
            userId: verifyTokenResponse.data.userId
        };

        const allLocationsResponse = await axios.post(FETCH_FAVES_ROUTE, fetchLocationsReq, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return allLocationsResponse.data.favourites;
    }
    catch (err) {
        console.log(err.message)
        throw err;
    }
}

export const addFavouriteLocationToDbService = async (authToken, location) => {
    const ADD_FAVE_ROUTE = "http://localhost:5000/favourite-locations/add-location";
    
    //send a verification request for the authToken before getting the saved locations;
    try {
        const verifyTokenResponse = await verifyTokenService(authToken);
        if (verifyTokenResponse.status === 422) 
        {
            throw new Error(`cannot verify request`);
        }
        // console.log(verifyTokenResponse.data.userId);
        //get back userId from the verified token
        const addLocationReq = {
            userId: verifyTokenResponse.data.userId,
            location: location
        };

        const addLocationResponse = await axios.patch(ADD_FAVE_ROUTE, addLocationReq, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //returns updated favourites list
        return addLocationResponse.data.favourites;
    }
    catch (err) {
        console.log(err.message)
        // throw err;
    }

}

export const deleteFavouriteLocationFromDbService = async (authToken, location) => {
    const DELETE_FAVE_ROUTE = "http://localhost:5000/favourite-locations/delete-location";
    // const authRequest = {
    //     authToken: authToken
    // }
    //send a verification request for the authToken before getting the saved locations;
    try {
        const verifyTokenResponse = await verifyTokenService(authToken);
        if (verifyTokenResponse.status === 422) 
        {
            throw new Error(`cannot verify request`);
        }
        const deleteLocationReq = {
            userId: verifyTokenResponse.data.userId,
            location: location
        };

        const deleteLocationResponse = await axios.patch(DELETE_FAVE_ROUTE, deleteLocationReq, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return deleteLocationResponse.data.favourites;

    }
    catch (err) {
        console.log(err.message);
    }
}