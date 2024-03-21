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
        if (getFavesResponse.favourites) {
            setHasSavedLocations(true);
            setFavouriteLocations(getFavesResponse.favourites);
            return;
        }
        setHasSavedLocations(false);
        setFavouriteLocations([]);
    }

    const getSavedFavourites = async () => {
        const getResponse = await getFavouriteLocationsFromDbService(authToken);
        
        return getResponse;       
    }

    const createNewFavouritesEntry = async (favourites) => {
        const newFavouritesEntry = await addNewUserFavouritesToDbService(authToken, favourites);
        setFavouriteLocations(newFavouritesEntry);
        return newFavouritesEntry;
    }

    const addLocationToFavourites = async (location) => {
        const updatedFavourites = await addFavouriteLocationToDbService(authToken, location);
        setFavouriteLocations(updatedFavourites);
        return updatedFavourites;
    }

    const deleteLocationFromFavourites = async (location) => {
        const updatedFavourites = await deleteFavouriteLocationFromDbService(authToken, location);
        setFavouriteLocations(updatedFavourites);
        return updatedFavourites;
    }

    const clearFavouritesForLogout = () => {
        setHasSavedLocations(false);
        setFavouriteLocations([]);
    }


    useEffect(() => {
        const fetchFavourites = async () => {
            if (loggedIn) {
                const favourites = await getSavedFavourites(authToken);
                updateSavedLocations();
            }
        }
        fetchFavourites();
    }, [loggedIn])


    return (
        <FavesContext.Provider
            value={{ favouriteLocations, getSavedFavourites, createNewFavouritesEntry, addLocationToFavourites, updateSavedLocations, deleteLocationFromFavourites, clearFavouritesForLogout }}>
            {children}
        </FavesContext.Provider>
    );
}

export const useFaves = () => {
    return useContext(FavesContext);
}