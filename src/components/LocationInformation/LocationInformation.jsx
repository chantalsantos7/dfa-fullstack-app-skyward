import { useState } from 'react';
import PropTypes from 'prop-types'
import Footer from "../Footer"
import Header from "../Header"
import WeatherForecast from "./WeatherForecast/WeatherForecast"
import './css/location-information.css'
import TellYouLocation from '../TellYouLocation'
import FavouriteLocationButton from './FavouriteLocationButton'
import DayForecastBox from './WeatherForecast/DayForecastBox';
import { useLocation } from 'react-router-dom';

const LocationInformation = ({ searchData: location, weatherData, checkHasSavedLocations }) => {
 
  return (
    <>
        <div className='container  mt-3 text-center'>
          <TellYouLocation displayString={location.searchBarText}  />
          <div className='row justify-content-center d-flex align-items-center'>
           <div className='col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center'>
             <FavouriteLocationButton location={location.searchBarText} checkHasSavedLocations={checkHasSavedLocations} />
           <label htmlFor='favourite-button' className='save-favourite-btn'>Click to save as favourite location</label>
           </div>
          {/* <div className="col-3 ">
            
          </div> */}
            
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg12 col-xl-12">
              <WeatherForecast weatherData={weatherData} />
            </div>      
          </div>
        </div>
      
    </>
  )
}

LocationInformation.propTypes = {
  searchData: PropTypes.exact( {
    searchBarText: PropTypes.string.isRequired
  }).isRequired,
  weatherData: PropTypes.object.isRequired,
  checkHasSavedLocations: PropTypes.func.isRequired
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