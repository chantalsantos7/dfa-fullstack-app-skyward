import React from 'react'; // Add the missing import statement for React

import PropTypes from 'prop-types'
import Footer from "../Footer"
import Header from "../Header"
import WeatherForecast from "./WeatherForecast/WeatherForecast"
import './css/location-information.css'
import TellYouLocation from '../TellYouLocation'
import FavouriteLocationButton from './FavouriteLocationButton'

const LocationInformation = ({ location, weatherResponse }) => {
  return (
    <>
      <Header />
      

        <div className='container  mt-3 text-center'>
          <TellYouLocation displayString={location} />
          <div className='row text-center'>
            <FavouriteLocationButton />
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg12 col-xl-12">
              <WeatherForecast />
            </div>      
          </div>
  
        </div>
      

      <Footer />
    </>
  )
}

LocationInformation.propTypes = {
  location: PropTypes.string.isRequired,
};

LocationInformation.defaultProps = {
  location: "Default location"
}

export default LocationInformation