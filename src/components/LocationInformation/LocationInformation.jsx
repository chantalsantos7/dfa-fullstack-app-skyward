import { useState } from 'react';
import PropTypes from 'prop-types'
import Footer from "../Footer"
import Header from "../Header"
import WeatherForecast from "./WeatherForecast/WeatherForecast"
import './css/location-information.css'
import TellYouLocation from '../TellYouLocation'
import FavouriteLocationButton from './FavouriteLocationButton'

const LocationInformation = ({ searchData: location, weatherData }) => {

  return (
    <>
      <Header />
        <div className='container  mt-3 text-center'>
          <TellYouLocation displayString={location.searchBarText}  />
          <div className='row text-center'>
            <FavouriteLocationButton />
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg12 col-xl-12">
              <WeatherForecast weatherData={weatherData} />
            </div>      
          </div>
  
        </div>
      

      <Footer />
    </>
  )
}

LocationInformation.propTypes = {
  searchData: PropTypes.exact( {
    searchBarText: PropTypes.string.isRequired
  }).isRequired,
  weatherData: PropTypes.array
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