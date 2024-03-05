import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { getFavouriteLocationsService, removeFromFavouriteLocationsService, saveFavouriteLocationService } from '../../utils/services';


const FavouriteLocationButton = ({ location }) => {

    const clickHandler = event => {

        if (!savedLocation) {
            saveFavouriteLocationService(location);
            setSavedLocation(true);
            return;
        }
        removeFromFavouriteLocationsService(location);
        setSavedLocation(false);
    }

    const [savedLocation, setSavedLocation] = useState(false);
    const checkLocationIsSaved = () => {
        const savedLocations = getFavouriteLocationsService();
        if (savedLocations && savedLocations.includes(location)) {
            setSavedLocation(true);
        }
    }

    useEffect(checkLocationIsSaved, [savedLocation]);
    // once added to favourites, render the bookmark-star-fill icon instead - state + apply new class to change colour
    // 
    return (
        <>
            <div className='container'>
                <button className='btn favourite-button save-favourite-btn ' type='button' onClick={clickHandler}>
                    {!!!savedLocation && <i className="bi bi-bookmark-star "></i>}
                    {!!savedLocation && <i className="bi bi-bookmark-star-fill "></i>}
                </button>
                {!!!savedLocation && <label htmlFor="favourite-button" className='save-favourite-btn'>Click to save as favourite location</label>}
                {!!savedLocation && <label htmlFor="favourite-button" className='save-favourite-btn'>Click to remove from Favourite Locations</label>}
            </div>

        </>
    )
}

FavouriteLocationButton.propTypes = {
    location: PropTypes.string.isRequired
}

FavouriteLocationButton.defaultProps = {
    location: "default"
}

export default FavouriteLocationButton;