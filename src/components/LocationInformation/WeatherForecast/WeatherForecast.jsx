import DayForecastBox from './DayForecastBox';
import WeatherTodayBox from './WeatherTodayBox';

const WeatherForecast = ({ weatherResponse }) => {
  return (
    <>
      <div className ="container mt-5">
        <div className="row">
          {/* favourite location button */}
          
        </div>
        <div className="row">
          <WeatherTodayBox  />
        </div>
        <div className="row">
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <DayForecastBox />
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <DayForecastBox />
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <DayForecastBox />
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            <DayForecastBox />
          </div>
        </div>
      </div>
      
    </>
  )
}

export default WeatherForecast