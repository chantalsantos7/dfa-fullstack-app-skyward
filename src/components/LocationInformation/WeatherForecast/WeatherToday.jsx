
const WeatherToday = () => {
  return (
    <>
    <div className="card weather-today text-center">
      <div className="card-body">
        <h4 className="card-title">Today's Weather: </h4>
        <p className="card-text">Day, Xth Month, Year</p>
        <div className="row">
            <div className="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4"> 
            <img className="mx-auto d-block" src="public/assets/weather-icons/01d.svg" alt="icon for current weather" />
          </div>
            <div className="row col-6 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
              <p>X &deg;C</p>
            </div>
            <div className="col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
              <p>Weather Desc</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default WeatherToday