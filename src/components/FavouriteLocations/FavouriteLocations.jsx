import Header from "../Header"
import Footer from "../Footer"
import TellYouLocation from "../TellYouLocation"
import FavouriteLocationName from "./FavouriteLocationName"

const FavouriteLocations = () => {
  return (
    <>
      <div className="container">
        <TellYouLocation displayString="Favourite Locations" />
        <div className="container">
          <FavouriteLocationName />
          <FavouriteLocationName />
          <FavouriteLocationName location="a favourite" />
        </div>
      </div>
    </>
  )
}

export default FavouriteLocations