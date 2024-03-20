import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getFavouriteLocationsFromDbService } from "../services/favesServices";

const FavesContext = createContext();

export const FavesProvider = ({ children }) => {
    const { authToken } = useAuth();
    const [favouriteLocations, setFavouriteLocations] = useState([]);
    const [hasSavedLocations, setHasSavedLocations] = useState(false);

    const checkHasSavedLocations = () => {
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

    const addLocationToFavourites = async () => {
        
    }


    useEffect(() => {
        const fetchFavourites = async () => {
            if (authToken) {
                const favourites = await getSavedFavourites(authToken);
                setFavouriteLocations(favourites);
            }
        }
        fetchFavourites();
    }, [authToken])

    useEffect(() => {
        checkHasSavedLocations();
    }, [hasSavedLocations]);


    return (
        <FavesContext.Provider
            value={{ favouriteLocations, getSavedFavourites }}>
            {children}
        </FavesContext.Provider>
    );
}

export const useFaves = () => {
    return useContext(FavesContext);
}