import DayForecast from './DayForecast';
import WeatherToday from './WeatherToday';

//TODO: Convert this component to a Bootstrap card

const WeatherForecast = ({ forecast }) => {
  return (
    <>
      <div className ="container mt-5">
        <div className="row">
          {/* favourite location button */}
          
        </div>
        <div className="row">
          <WeatherToday  />
        </div>
        <div className="row">
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <DayForecast />
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <DayForecast />
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <DayForecast />
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <DayForecast />
          </div>
        </div>
      </div>
      
    </>
  )
}

export default WeatherForecast