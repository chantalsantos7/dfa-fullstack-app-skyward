
const WeatherToday = () => {
  return (
    <>
      <div className="container weather-today text-center">
        <h4>Today's Weather:</h4>
          <p>Day, Xth Mon, Year</p>
          <img src="public/assets/weather-icons/01d.svg" alt="icon for current weather" />
          <p>X &deg;C</p>
          <p>Weather Desc</p>
        
      </div>
    </>
  )
}

export default WeatherToday