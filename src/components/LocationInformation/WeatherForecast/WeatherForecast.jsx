import DayForecast from './DayForecast';
import WeatherToday from './WeatherToday';

const WeatherForecast = () => {
  return (
    <>
      <div className ="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="tell-me-about-text">Telling you about...</h1>
          </div>
          <div className='col-12 text-center'>
            <h1 className="location-text">PlaceholderName</h1>
          </div>
        </div>
        <div className="row">
          {/* favourite location button */}
          
        </div>
        <div className="row justify-content-center">
          <WeatherToday />
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