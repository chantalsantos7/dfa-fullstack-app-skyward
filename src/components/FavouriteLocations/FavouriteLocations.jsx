import PropTypes from 'prop-types'
import TellYouLocation from "../TellYouLocation"
import FavouriteLocationName from "./FavouriteLocationName"
import "./css/favourite-locations.css"
import { getFavouriteLocationsService } from '../../utils/services'

const FavouriteLocations = ( { checkHasSavedLocations,handleLocationLinkClick } ) => {

  const favouriteLocations = getFavouriteLocationsService();
  let favouriteLocationLinks = [];
  let i = 0;
  favouriteLocations.forEach(fave => {
    favouriteLocationLinks.push(
      <FavouriteLocationName
        key={i++}
        location={fave}
        checkHasSavedLocations={checkHasSavedLocations}
        handleLocationLinkClick={handleLocationLinkClick}
      />
    );
  });
  
  return (
    <>
      <div className="container favourite-locations-container">
        <TellYouLocation displayString="Favourite Locations" />
        <div className="container mt-4 location-links-container">
          {favouriteLocationLinks.length > 0 && favouriteLocationLinks}
        </div>
      </div>
    </>
  )
}

FavouriteLocations.propTypes = {
  checkHasSavedLocations: PropTypes.func.isRequired,
  handleLocationLinkClick: PropTypes.func.isRequired
}

export default FavouriteLocations