import axios from "axios";
import { verifyTokenService } from "./authServices";

export const getFavouriteLocationsFromDbService = async (authToken) => {
    const FETCH_FAVES_ROUTE = "http://localhost:5000/favourite-locations/fetch-all";
    const authRequest = {
        authToken: authToken
    }
    //send a verification request for the authToken before getting the saved locations;
    try {
        const verifyTokenResponse = await verifyTokenService(authRequest);
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
    console.log("reached the addLocationToDbService")
    const authRequest = {
        authToken: authToken
    }
    //send a verification request for the authToken before getting the saved locations;
    try {
        const verifyTokenResponse = await verifyTokenService(authRequest);
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