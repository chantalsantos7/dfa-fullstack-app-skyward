import PropTypes from 'prop-types'
import Footer from "../Footer"
import Header from "../Header"
import HotelInformation from "./HotelInformation"
import Map from './Map'
import WeatherForecast from "./WeatherForecast/WeatherForecast"
import './css/location-information.css'
import TellYouLocation from '../TellYouLocation'
import FavouriteLocationButton from '../FavouriteLocations/FavouriteLocationButton'

const LocationInformation = ({ location, forecast }) => {
  return (
    <>
      <Header />
      

        <div className='container  mt-3'>
          <TellYouLocation displayString="Prop Location" />
          <FavouriteLocationButton />
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <WeatherForecast />
            </div>
  
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <Map />
            </div>
          </div>
  
          <div className="row">
            <HotelInformation />
          </div>
        </div>
      

      <Footer />
    </>
  )
}

LocationInformation.PropTypes = {
  location: PropTypes.string.isRequired,
};

LocationInformation.defaultProps = {
  location: "Default location"
}

export default LocationInformation