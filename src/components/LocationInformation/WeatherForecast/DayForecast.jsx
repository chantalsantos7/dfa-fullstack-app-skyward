
const DayForecast = () => {
  return (
    <>

      <div className="card day-forecast text-center">
        <div className="card-body">
          <h5 className="card-title">Next Day Name</h5>
          <img  src="public/assets/weather-icons/01d.svg" className="card-img mx-auto d-block" alt="icon for weather forecast" />
          <p className="card-text">X &deg;C</p>
          <p className="card-text">Weather Desc</p>
        </div>
      </div>
      {/* <div className="container day-forecast">
        <h5>Next Day Name</h5>

        
        <p></p>
        
      </div> */}

    </>
  )
}

export default DayForecast;