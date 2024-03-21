import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { addFavouriteLocationToDbService, addNewUserFavouritesToDbService, deleteFavouriteLocationFromDbService, getFavouriteLocationsFromDbService } from "../services/favesServices";

const FavesContext = createContext();

export const FavesProvider = ({ children }) => {
    const { loggedIn, authToken } = useAuth();
    const [favouriteLocations, setFavouriteLocations] = useState([]);
    const [hasSavedLocations, setHasSavedLocations] = useState(false);

    const updateSavedLocations = async () => {

        const getFavesResponse = await getSavedFavourites(authToken);
        console.log("does it reach updateSavedLocations?");
        console.log(`response from getSavedFavourites in updateSavedLocation: ${JSON.stringify(getFavesResponse)}`)
        if (getFavesResponse.favourites) {
            setHasSavedLocations(true);
            setFavouriteLocations(getFavesResponse.favourites);
            return;
        }
        setHasSavedLocations(false);
        setFavouriteLocations([]);
        // const savedFaves = getSavedFavourites(authToken);
        // if (savedFaves && savedFaves.length > 0) {
        //     setHasSavedLocations(true);
        //     setFavouriteLocations(savedFaves);
        //     return;
        // }
        // setHasSavedLocations(false);
        // setFavouriteLocations([]);
    }

    const getSavedFavourites = async () => {
        const getResponse = await getFavouriteLocationsFromDbService(authToken);
        
        return getResponse;

        // if (getResponse.favourites.length > 0) {
        //     const favourites = getResponse.favourites;
        //     return favourites;
        // } else {
        //     return getResponse.message;
        // }
        
    }

    const createNewFavouritesEntry = async (favourites) => {
        const newFavouritesEntry = await addNewUserFavouritesToDbService(authToken, favourites);
        setFavouriteLocations(newFavouritesEntry);
        return newFavouritesEntry;
    }

    const addLocationToFavourites = async (location) => {
        const updatedFavourites = await addFavouriteLocationToDbService(authToken, location);
        // setFavouriteLocations(updatedFavourites);
        setFavouriteLocations(updatedFavourites);
        return updatedFavourites;
    }

    const deleteLocationFromFavourites = async (location) => {
        const updatedFavourites = await deleteFavouriteLocationFromDbService(authToken, location);
        setFavouriteLocations(updatedFavourites);
        return updatedFavourites;
    }


    useEffect(() => {
        const fetchFavourites = async () => {
            if (loggedIn) {
                const favourites = await getSavedFavourites(authToken);
                // setFavouriteLocations(favourites);
                updateSavedLocations();
            }
        }
        fetchFavourites();
    }, [loggedIn])

    // useEffect(() => {
    //     checkHasSavedLocations();
    // }, [hasSavedLocations]);


    return (
        <FavesContext.Provider
            value={{ favouriteLocations, getSavedFavourites, createNewFavouritesEntry, addLocationToFavourites, updateSavedLocations, deleteLocationFromFavourites }}>
            {children}
        </FavesContext.Provider>
    );
}

export const useFaves = () => {
    return useContext(FavesContext);
}