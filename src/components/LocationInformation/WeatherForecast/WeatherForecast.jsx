import PropTypes from 'prop-types';
import DayForecastBox from './DayForecastBox';
import WeatherTodayBox from './WeatherTodayBox';

const WeatherForecast = ({ weatherData }) => {

  return (
    <>
      <div className ="container mt-5">
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

WeatherForecast.propTypes = {
  weatherData: PropTypes.object.isRequired
}

export default WeatherForecast