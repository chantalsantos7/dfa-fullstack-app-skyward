import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatTemperature } from '../../../utils/formatting';
import DayForecastBox from './DayForecastBox';
import WeatherTodayBox from './WeatherTodayBox';
import ErrorComponent from './ErrorComponent';

const WeatherForecast = ({ weatherData }) => {

  const { ...daysArray } = weatherData;

  const [hasDayData, setDayData] = useState(false);
  const [days, setDays] = useState(null);


  useEffect(() => {
    // console.log("I'm a useEffect hook! I am being triggered!");
    // console.log(weatherData);
    // console.log(weatherData.list);
    if (daysArray) {
      // console.log(`I'm the condition inside the effect hook!`)
      // console.log(daysArray);
      // const updatedDays = updateState(weatherData);
      setDayData(true);
      setDays(daysArray);

    }
  }, [weatherData]);


  return (
    <>
      <div className="container mt-5">
        <div className="row">

          {!!hasDayData && <WeatherTodayBox day={days[0]} />}
          {!!!hasDayData && <ErrorComponent />}
        </div>
        <div className="row">
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            {!!hasDayData && <DayForecastBox day={days[1]} />}
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            {!!hasDayData && <DayForecastBox day={days[2]} />}
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            {!!hasDayData && <DayForecastBox day={days[3]} />}
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            {!!hasDayData && <DayForecastBox day={days[4]} />}
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