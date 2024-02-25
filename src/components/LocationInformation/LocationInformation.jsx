import Footer from "../Footer"
import Header from "../Header"
import WeatherForecast from "./WeatherForecast/WeatherForecast"
import './css/location-information.css'

const LocationInformation = () => {
  return (
    <>
      <Header />
      <WeatherForecast />
      <Footer />
    </>
  )
}

export default LocationInformation