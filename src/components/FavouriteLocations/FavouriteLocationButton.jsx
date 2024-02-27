import PropTypes from 'prop-types'

const FavouriteLocationButton = () => {
    
    // once added to favourites, render the bookmark-star-fill icon instead - state
    return (
        <>
            <button className='favourite-button' type='button'>
            <i class="bi bi-bookmark-star"></i> 
            Click to save as favourite location
            </button>
           
        </>
    )
}

export default FavouriteLocationButton;