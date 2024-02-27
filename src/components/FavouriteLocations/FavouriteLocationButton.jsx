import PropTypes from 'prop-types'

const FavouriteLocationButton = () => {
    
    // once added to favourites, render the bookmark-star-fill icon instead - state
    return (
        <>
            <div className='container'>
                <button className='btn favourite-button' type='button'>
                <i className="bi bi-bookmark-star"></i> 
                </button>
                <label htmlFor="favourite-button">Click to save as favourite location</label>
            </div>
           
        </>
    )
}


export default FavouriteLocationButton;