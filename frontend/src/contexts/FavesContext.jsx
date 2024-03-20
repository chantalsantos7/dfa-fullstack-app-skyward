import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { addFavouriteLocationToDbService, getFavouriteLocationsFromDbService } from "../services/favesServices";

const FavesContext = createContext();

export const FavesProvider = ({ children }) => {
    const { authToken } = useAuth();
    const [favouriteLocations, setFavouriteLocations] = useState([]);
    const [hasSavedLocations, setHasSavedLocations] = useState(false);

    const checkHasSavedLocations = async (authToken) => {

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

    const getSavedFavourites = async (authToken) => {
        const favourites = await getFavouriteLocationsFromDbService(authToken);
        return favourites;
    }

    const addLocationToFavourites = async (location) => {
        const updatedFavourites = await addFavouriteLocationToDbService(authToken, location);
        // setFavouriteLocations(updatedFavourites);
        return updatedFavourites;
    }


    useEffect(() => {
        const fetchFavourites = async () => {
            if (authToken) {
                const favourites = await getSavedFavourites(authToken);
                // setFavouriteLocations(favourites);
                checkHasSavedLocations(authToken);
            }
        }
        fetchFavourites();
    }, [authToken])

    // useEffect(() => {
    //     checkHasSavedLocations();
    // }, [hasSavedLocations]);


    return (
        <FavesContext.Provider
            value={{ favouriteLocations, getSavedFavourites, addLocationToFavourites, checkHasSavedLocations }}>
            {children}
        </FavesContext.Provider>
    );
}

export const useFaves = () => {
    return useContext(FavesContext);
}