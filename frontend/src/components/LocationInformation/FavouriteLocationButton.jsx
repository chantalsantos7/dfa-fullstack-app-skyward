import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { getFavouriteLocationsService, removeFromFavouriteLocationsService, saveFavouriteLocationService } from '../../utils/services';
import { useFaves } from '../../contexts/FavesContext';
import { useAuth } from '../../contexts/AuthContext';

// , checkHasSavedLocations
const FavouriteLocationButton = ({ location }) => {
    const { loggedIn } = useAuth();
    const { favouriteLocations, getSavedFavourites, createNewFavouritesEntry, addLocationToFavourites, updateSavedLocations, deleteLocationFromFavourites } = useFaves();
    const [savedLocation, setSavedLocation] = useState(false);

    //FaveLocationButton is not being rerendered when the location changes
    const clickHandler = async () => {

        //Only allow saving when logged in now
        //1. check loggedIn state, only allow saving to faves if logged in
        //A. if location is not already saved: 
            //2. get all savedFaves from Db 
                //- if message is "No favourites saved yet":
                    //create a new faves entry, which saves this location
                //if we get back saved locations:
                    //add Location to favourites
            //3. setSavedLocation to true
            //5. return
        //B. if location is already saved: 
            //2. confirm if user wants to remove this location from savedFaves
            //3. remove from favourites
            //4. set SavedLocation to False
            //5. return

        if (loggedIn === true) {
            if (!savedLocation) {
                const getFavesResponse = await getSavedFavourites();
                if (getFavesResponse.message === "No favourites saved yet") {
                    const newFavesReq = [`${location}`];
                    try {
                         await createNewFavouritesEntry(newFavesReq);
                    }
                    catch (err) {
                        console.error(err);
                        return;
                    }
                }
                else if (getFavesResponse.favourites) {
                    try {
                        await addLocationToFavourites(location);
                    }
                    catch (err) {
                        console.error(err);
                        return;
                    }
                }
                setSavedLocation(true);
                return;
            }

            if (confirm("Are you sure you want to remove this location from your favourites?")) {
                try {
                    await deleteLocationFromFavourites(location);
                }
                catch (err)
                {
                    console.error(err);
                    return;
                }
                setSavedLocation(false);
                return;
            }
        }
        alert("Please log in to save a location");
        return;

    }


    const checkLocationIsSaved = () => {
        if (favouriteLocations && favouriteLocations.includes(location)) {
            setSavedLocation(true);
        }
        else {
            setSavedLocation(false);
        }
    }

    useEffect(checkLocationIsSaved, [savedLocation]);
    useEffect(checkLocationIsSaved, [location]);
    useEffect(checkLocationIsSaved, []);
    // once added to favourites, render the bookmark-star-fill icon instead 
    return (
        <>
            <button className='btn favourite-button save-favourite-btn ' type='button' onClick={clickHandler}>
                {!!!savedLocation && <i className="bi bi-bookmark-star "></i>}
                {!!savedLocation && <i className="bi bi-bookmark-star-fill "></i>}
            </button>
        </>
    )
}

FavouriteLocationButton.propTypes = {
    location: PropTypes.string.isRequired,
}

FavouriteLocationButton.defaultProps = {
    location: "default"
}

export default FavouriteLocationButton;