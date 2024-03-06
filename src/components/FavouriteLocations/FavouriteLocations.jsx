import PropTypes from 'prop-types'
import TellYouLocation from "../TellYouLocation"
import FavouriteLocationName from "./FavouriteLocationName"
import "./css/favourite-locations.css"
import { getFavouriteLocationsService } from '../../utils/services'

const FavouriteLocations = ( { checkHasSavedLocations, setSearchBarText, submitLocation } ) => {

  const favouriteLocations = getFavouriteLocationsService();
  let favouriteLocationLinks = [];
  let i = 0;
  favouriteLocations.forEach(fave => {
    console.log(fave);
    favouriteLocationLinks.push(
      <FavouriteLocationName
        key={i++}
        location={fave}
        checkHasSavedLocations={checkHasSavedLocations}
        setSearchBarText={setSearchBarText}
        submitLocation={submitLocation}
      />
    );
  });

  console.log(favouriteLocationLinks);
  //TODO: strange behaviour rn, will not remove Links until first Item in array is removed
  return (
    <>
      <div className="container favourite-locations-container">
        <TellYouLocation displayString="Favourite Locations" />
        <div className="container">
          <FavouriteLocationName checkHasSavedLocations={checkHasSavedLocations} />
          {favouriteLocationLinks.length > 0 && favouriteLocationLinks}
        </div>
      </div>
    </>
  )
}

FavouriteLocations.propTypes = {
  checkHasSavedLocations: PropTypes.func.isRequired,
  setSearchBarText: PropTypes.func.isRequired,
  submitLocation: PropTypes.func.isRequired
}

export default FavouriteLocations