import PropTypes from 'prop-types'
import FavouriteLocationButton from '../LocationInformation/FavouriteLocationButton'
import { Link } from 'react-router-dom'
const FavouriteLocationName = ({ location, checkHasSavedLocations, setSearchBarText, submitLocation }) => {
  
  const handleClick = () => {
    event.preventDefault();
    setSearchBarText(location);
    submitLocation(location);
  }

  return (
    <>
      <div className="row favourite-location">
      <FavouriteLocationButton location={location} checkHasSavedLocations={checkHasSavedLocations} />
        <div className="col-6">
          <Link className='favourite-location-link' to='/weather'
          onClick={handleClick}>{location}</Link>
        </div>
      </div>
    </>
  )
}

FavouriteLocationName.propTypes = {
  location: PropTypes.string.isRequired,
  checkHasSavedLocations: PropTypes.func.isRequired,
  setSearchBarText: PropTypes.func.isRequired,
  submitLocation: PropTypes.func.isRequired
}

FavouriteLocationName.defaultProps = {
  location: "default name"
}

export default FavouriteLocationName