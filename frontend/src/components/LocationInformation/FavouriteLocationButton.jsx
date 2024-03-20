import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { getFavouriteLocationsService, removeFromFavouriteLocationsService, saveFavouriteLocationService } from '../../utils/services';
import { useFaves } from '../../contexts/FavesContext';
import { useAuth } from '../../contexts/AuthContext';

// , checkHasSavedLocations
const FavouriteLocationButton = ({ location }) => {
    const { authToken } = useAuth();
    const { favouriteLocations, addLocationToFavourites, checkHasSavedLocations } = useFaves();
    const [savedLocation, setSavedLocation] = useState(false);
    
    const clickHandler = async () => {

        if (!savedLocation) {
            // saveFavouriteLocationService(location);
            addLocationToFavourites( location);
            setSavedLocation(true);
            checkHasSavedLocations();
            return;
        }
        if (confirm("Are you sure you want to remove this location from your favourites?")) {
            removeFromFavouriteLocationsService(location);
            setSavedLocation(false);
            // checkHasSavedLocations();
        }
    }

    
    const checkLocationIsSaved = () => {
        // const savedLocations = getFavouriteLocationsService();
        if (favouriteLocations && favouriteLocations.includes(location)) {
            setSavedLocation(true);
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