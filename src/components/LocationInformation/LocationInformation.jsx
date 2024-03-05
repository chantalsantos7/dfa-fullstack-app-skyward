import { useState } from 'react';
import PropTypes from 'prop-types'
import Footer from "../Footer"
import Header from "../Header"
import WeatherForecast from "./WeatherForecast/WeatherForecast"
import './css/location-information.css'
import TellYouLocation from '../TellYouLocation'
import FavouriteLocationButton from './FavouriteLocationButton'
import DayForecastBox from './WeatherForecast/DayForecastBox';

const LocationInformation = ({ searchData: location, weatherData, checkHasSavedLocations }) => {

  return (
    <>
        <div className='container  mt-3 text-center'>
          <TellYouLocation displayString={location.searchBarText}  />
          <div className='row justify-content-center'>
           <div className='col-1'>
             <FavouriteLocationButton location={location.searchBarText} checkHasSavedLocations={checkHasSavedLocations} />
           </div>
          <div className="col-3 text-left">
            <p className='save-favourite-btn text-left'>Click to save as favourite location</p>
           {/* <label htmlFor="favourite-button" className='save-favourite-btn text-left'>Click to save as favourite location</label> */}
          </div>
            
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