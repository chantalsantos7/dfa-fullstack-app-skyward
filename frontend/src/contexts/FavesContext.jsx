import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { addFavouriteLocationToDbService, deleteFavouriteLocationFromDbService, getFavouriteLocationsFromDbService } from "../services/favesServices";

const FavesContext = createContext();

export const FavesProvider = ({ children }) => {
    const { loggedIn, authToken } = useAuth();
    const [favouriteLocations, setFavouriteLocations] = useState([]);
    const [hasSavedLocations, setHasSavedLocations] = useState(false);

    const updateSavedLocations = async () => {

        const savedFaves = await getSavedFavourites(authToken);
        if (savedFaves && savedFaves.length > 0) {
            setHasSavedLocations(true);
            setFavouriteLocations(savedFaves);
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
        const favourites = await getFavouriteLocationsFromDbService(authToken);
        return favourites;
    }

    const addLocationToFavourites = async (location) => {
        const updatedFavourites = await addFavouriteLocationToDbService(authToken, location);
        // setFavouriteLocations(updatedFavourites);
        return updatedFavourites;
    }

    const deleteLocationFromFavourites = async (location) => {
        const updatedFavourites = await deleteFavouriteLocationFromDbService(authToken, location);
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
            value={{ favouriteLocations, getSavedFavourites, addLocationToFavourites, updateSavedLocations, deleteLocationFromFavourites }}>
            {children}
        </FavesContext.Provider>
    );
}

export const useFaves = () => {
    return useContext(FavesContext);
}