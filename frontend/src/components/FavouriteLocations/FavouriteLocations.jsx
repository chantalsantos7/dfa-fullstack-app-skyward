import PropTypes from 'prop-types'
import TellYouLocation from "../TellYouLocation"
import FavouriteLocationName from "./FavouriteLocationName"
import "./css/favourite-locations.css"
import { getFavouriteLocationsService } from '../../utils/services'
import { useFaves } from '../../contexts/FavesContext'

// { checkHasSavedLocations, handleLocationLinkClick }
const FavouriteLocations = ({ handleLocationLinkClick }) => {

  const { favouriteLocations } = useFaves();


  let favouriteLocationLinks = [];
  let i = 0;
  favouriteLocations.forEach(fave => {
    favouriteLocationLinks.push(
      <div className='col-12 col-sm-12 com-md-4 col-l-4 col-xl-4'>
        <FavouriteLocationName
          key={i++}
          location={fave}
          handleLocationLinkClick={handleLocationLinkClick}
        />
      </div>
    );
  });

  const linkRows = [];

  for (let i = 0; i < favouriteLocationLinks.length; i += 3) {
    linkRows.push(
      <div className="row">
        {favouriteLocationLinks[i]}
        {favouriteLocationLinks[i + 1] ? favouriteLocationLinks[i + 1] : null}
        {favouriteLocationLinks[i + 2] ? favouriteLocationLinks[i + 2] : null}
      </div>
    );
  }

  return (
    <>
      <div className="container favourite-locations-container">
        <TellYouLocation displayString="Favourite Locations" />
        <div className="container mt-4 location-links-container">
          {linkRows.length > 0 && linkRows}
          <div className="row ">
            <div className="col location-col mobile-buffer"></div>
          </div>
        </div>
      </div>
    </>
  )
}

FavouriteLocations.propTypes = {
  // checkHasSavedLocations: PropTypes.func.isRequired,
  // handleLocationLinkClick: PropTypes.func.isRequired
}

export default FavouriteLocations