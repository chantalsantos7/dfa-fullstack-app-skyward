import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import FavouriteLocationButton from '../LocationInformation/FavouriteLocationButton'
const FavouriteLocationName = ({ location, checkHasSavedLocations, handleLocationLinkClick }) => {
  
  const handleClick = () => {
    event.preventDefault();
    handleLocationLinkClick(location);
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
  handleLocationLinkClick: PropTypes.func.isRequired
}

FavouriteLocationName.defaultProps = {
  location: "default name"
}

export default FavouriteLocationName