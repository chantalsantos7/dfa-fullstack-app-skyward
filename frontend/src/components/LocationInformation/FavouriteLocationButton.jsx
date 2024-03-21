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
            //4. update savedLocations
            //5. return
        //B. if location is already saved: 
            //2. confirm if user wants to remove this location from savedFaves
            //3. remove from favourites
            //4. setSavedLocationToFalse
            //5. update savedLocations






        
        // if (loggedIn) {
        //     const faves = await getSavedFavourites();
        //     // console.log(`faves is: ${faves}`);
        //     if (faves.length === 0) {
        //         //favourites haven't been created for this user yet, so add a new entry entirely
        //         const newFavesArray = [`${location}`];
        //         const newFavouritesEntry = createNewFavouritesEntry(newFavesArray);
        //     }

        //     if (!savedLocation) {
        //         try {
        //             addLocationToFavourites(location);
        //             setSavedLocation(true);
        //             updateSavedLocations();
        //             return;
        //         }
        //         catch (err) {
        //             console.log(err.message);
        //             return;
        //         }

        //     }

        // }

        // if (loggedIn) {
        //     if (confirm("Are you sure you want to remove this location from your favourites?")) {
        //         // removeFromFavouriteLocationsService(location);
        //         try {
        //             deleteLocationFromFavourites(location);
        //             setSavedLocation(false);
        //             updateSavedLocations();
        //             return;
        //         }
        //         catch (err) {
        //             console.error(err);
        //         }
        //     }
        // }
        // alert("Please log in to save locations");





    }


    const checkLocationIsSaved = () => {
        // const savedLocations = getFavouriteLocationsService();
        console.log(favouriteLocations);
        console.log(favouriteLocations.includes(location))
        if (favouriteLocations && favouriteLocations.includes(location)) {
            setSavedLocation(true);
        }
        else {
            setSavedLocation(false);
        }
    }

    useEffect(checkLocationIsSaved, [savedLocation, location]);
    useEffect(checkLocationIsSaved, []);
    // once added to favourites, render the bookmark-star-fill icon instead - state + apply new class to change colour
    // 
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
    // checkHasSavedLocations: PropTypes.func.isRequired
}

FavouriteLocationButton.defaultProps = {
    location: "default"
}

export default FavouriteLocationButton;