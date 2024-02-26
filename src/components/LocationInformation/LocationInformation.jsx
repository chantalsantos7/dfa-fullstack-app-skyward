import Footer from "../Footer"
import Header from "../Header"
import HotelInformation from "./HotelInformation"
import Map from './Map'
import WeatherForecast from "./WeatherForecast/WeatherForecast"
import './css/location-information.css'

const LocationInformation = () => {
  return (
    <>
      <Header />
      <div className="container mt-3">
        <div className="row mt-5">
          <div className="col-12 text-center">
            <h1 className="tell-me-about-text">Telling you about...</h1>
          </div>
          <div className='col-12 text-center'>
            <h1 className="location-text">PlaceholderName</h1>
          </div>
        </div>
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

export default LocationInformation