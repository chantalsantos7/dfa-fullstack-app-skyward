import axios from "axios";
import { verifyTokenService } from "./authServices";

export const getFavouriteLocationsFromDbService = async (authToken) => {
    const FETCH_FAVES_ROUTE = "http://localhost:5000/favourite-locations/fetch-all";
    // console.log(`request is: ${authToken}`);

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
        // console.log(allLocationsResponse);
        return allLocationsResponse.data.favourites;
    }
    catch (err) {
        console.log(err.message)
        throw err;
    }

    //if the response is successful, request for the favourite locations

}