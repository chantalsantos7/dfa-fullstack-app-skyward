import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { getFavouriteLocationsService, removeFromFavouriteLocationsService, saveFavouriteLocationService } from '../../utils/services';
import { useFaves } from '../../contexts/FavesContext';
import { useAuth } from '../../contexts/AuthContext';

// , checkHasSavedLocations
const FavouriteLocationButton = ({ location }) => {
    const { loggedIn } = useAuth();
    const { favouriteLocations, addLocationToFavourites, updateSavedLocations, deleteLocationFromFavourites } = useFaves();
    const [savedLocation, setSavedLocation] = useState(false);

    //FaveLocationButton is not being rerendered when the location changes
    const clickHandler = async () => {

        //if logged in, use the database services
        if (loggedIn) {
            if (!savedLocation) {
                try {
                    addLocationToFavourites(location);
                    setSavedLocation(true);
                    updateSavedLocations();
                    return;
                }
                catch (err) {
                    console.log(err.message);
                    return;
                }

            }

        }

        if (loggedIn) {
            if (confirm("Are you sure you want to remove this location from your favourites?")) {
                // removeFromFavouriteLocationsService(location);
                try {
                    deleteLocationFromFavourites(location);
                    setSavedLocation(false);
                    updateSavedLocations();
                    return;
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
        alert("Please log in to save locations");





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

    useEffect(checkLocationIsSaved, [savedLocation]);
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