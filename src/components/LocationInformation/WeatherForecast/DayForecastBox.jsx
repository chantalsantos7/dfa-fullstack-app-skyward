import PropTypes from 'prop-types'

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DayForecastBox = ({ day: dayWeather }) => {
  
  return (
    <>
      <div className="card day-forecast text-center">
        <div className="card-body">
          <h5 className="card-title">{weekdays[new Date(dayWeather.date).getDay()]}</h5>
          <img  src={`/assets/weather-icons/${dayWeather.icon}.svg`} className="card-img mx-auto d-block" alt="icon for weather forecast" />
          <p className="card-text">{dayWeather.temp} &deg;C</p>
          <p className="card-text">{dayWeather.weather_desc}</p>
        </div>
      </div>
    </>
  )
}

DayForecastBox.propTypes = {
  day: PropTypes.shape(
    {
      date: PropTypes.string.isRequired,
      weather_desc: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired
    }
  ).isRequired
}

DayForecastBox.defaultProps = {
  day: {
    date: new Date().toUTCString(),
    weather_desc: 'default description',
    icon: '01d',
    temp: 420
  }
}

export default DayForecastBox;