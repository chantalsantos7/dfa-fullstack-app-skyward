import PropTypes from 'prop-types'

const WeatherTodayBox = ({ day: dayWeather }) => {
  return (
    <>
    <div className="card weather-today text-center">
      <div className="card-body">
        <h4 className="card-title">Today's Weather: </h4>
        <p className="card-text">{dayWeather.date}</p>
        <div className="row">
            <div className="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4"> 
            <img className="mx-auto d-block" src={`/assets/weather-icons/${dayWeather.icon}.svg`} alt="icon for current weather" />
          </div>
            <div className="row col-6 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
            <div className="d-flex justify-content-center align-items-center col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
              <p>{dayWeather.temp} &deg;C</p>
            </div>
            <div className="d-flex justify-content-center align-items-center col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
              <p>{dayWeather.weather_desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

WeatherTodayBox.propTypes = {
  day: PropTypes.shape(
    {
      date: PropTypes.string.isRequired,
      weather_desc: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      temp: PropTypes.string.isRequired
    }
  ).isRequired
}

WeatherTodayBox.defaultProps = {
  day: {
    date: new Date().toDateString(),
    weather_desc: 'default description',
    icon: '01d',
    temp: '420'
  }
}

export default WeatherTodayBox