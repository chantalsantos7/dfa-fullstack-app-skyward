import PropTypes from 'prop-types'
import { saveFavouriteLocationService } from '../../utils/services';


const FavouriteLocationButton = ( {location} ) => {
    
    const clickHandler = event => {
        
        saveFavouriteLocationService(location);
    }

    


    // once added to favourites, render the bookmark-star-fill icon instead - state + apply new class to change colour
    // 
    return (
        <>
            <div className='container'>
                <button className='btn favourite-button save-favourite-btn' type='button' onClick={clickHandler}>
                <i className="bi bi-bookmark-star "></i> 
                </button>
                <label htmlFor="favourite-button" className='save-favourite-btn'>Click to save as favourite location</label>
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