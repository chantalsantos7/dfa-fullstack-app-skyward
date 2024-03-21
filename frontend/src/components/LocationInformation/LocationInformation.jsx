import PropTypes from 'prop-types'
import WeatherForecast from "./WeatherForecast/WeatherForecast"
import './css/location-information.css'
import TellYouLocation from '../TellYouLocation'
import FavouriteLocationButton from './FavouriteLocationButton'


const LocationInformation = ({ weatherData }) => {
 
  return (
    <>
        <div className='container mt-3 text-center location-container'>
          <TellYouLocation displayString={weatherData.location}  />
          <div className='row justify-content-center d-flex align-items-center'>
           <div className='location-col col-12 col-sm-12 col-md-4 col-lg-4 d-flex align-items-center justify-content-center'>
             <FavouriteLocationButton location={weatherData.location}  />
           <label htmlFor='favourite-button' className='save-favourite-btn'>Click to save as favourite location</label>
           </div>         
          </div>
          <div className="row">
            <div className="location-col col-12 col-sm-12 col-md-12 col-lg12 col-xl-12">
              <WeatherForecast weatherData={weatherData} />
            </div>      
          </div>

          <div className="row ">
            <div className="col location-col mobile-buffer"></div>
          </div>
        </div>
      
    </>
  )
}

LocationInformation.propTypes = {
  weatherData: PropTypes.object.isRequired,
  // checkHasSavedLocations: PropTypes.func.isRequired
};

LocationInformation.defaultProps = {
  searchData: {
    searchBarText: "Default location"
  },
  weatherData: {
    name: `Default`,
    temp: 420
  }
}

export default LocationInformation