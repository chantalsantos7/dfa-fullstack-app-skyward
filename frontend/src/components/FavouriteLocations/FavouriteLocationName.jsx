import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import FavouriteLocationButton from '../LocationInformation/FavouriteLocationButton'
const FavouriteLocationName = ({ location, handleLocationLinkClick }) => {
  
  const handleClick = (e) => {
    e.preventDefault();
    handleLocationLinkClick(location);
  }

  //navigate to the weather page, submitting the location to it

  return (
    <>
      <div className="row favourite-location">
      <FavouriteLocationButton location={location} />
        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <Link className='favourite-location-link' to='/weather'
          onClick={handleClick}>{location}</Link>
        </div>
      </div>
    </>
  )
}

FavouriteLocationName.propTypes = {
  location: PropTypes.string.isRequired,
}

FavouriteLocationName.defaultProps = {
  location: "default name"
}

export default FavouriteLocationName