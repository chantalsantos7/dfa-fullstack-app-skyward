import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatTemperature } from '../../../utils/formatting';
import DayForecastBox from './DayForecastBox';
import WeatherTodayBox from './WeatherTodayBox';

const WeatherForecast = ({ weatherData }) => {

  const [hasDayData, setDayData] = useState(false);
  const [days, setDays] = useState(null);

  const updateState = (data) => {
    const tempDays = [];
    const dayIndices = getDayIndices(data);

    dayIndices.forEach((index) => {
      const currentData = data.list[index];
      tempDays.push({
        date: currentData.dt_txt,
        weather_desc: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        temp: formatTemperature(currentData.main.temp)
      });
    });
    setDayData(true);
    return tempDays;
  }

  const getDayIndices = (data) => {
    let dayIndices = [0];
    let currentDay = data.list[0].dt_txt.slice(8, 10);
    // console.log('current day is: ' + currentDay);

    for (let i = 0; i < data.list.length; i++) {
      let day = data.list[i].dt_txt.slice(8, 10);
      let hour = data.list[i].dt_txt.slice(11, 13);
      if (day !== currentDay && hour === '15') {
        dayIndices.push(i);
        currentDay = day;

        if (dayIndices.length === 5) {
          break;
        }
      }
    }

    return dayIndices;
  }


  useEffect(() => {
    if (weatherData && weatherData.list) {
      const updatedDays = updateState(weatherData);
      setDays(updatedDays);

    }
  }, [weatherData]);


  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {hasDayData && <WeatherTodayBox day={days[0]} />}
        </div>
        <div className="row">
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
            {hasDayData && <DayForecastBox day={days[1]} />}
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          {hasDayData && <DayForecastBox day={days[2]} />}
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          {hasDayData && <DayForecastBox day={days[3]} />}
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          {hasDayData && <DayForecastBox day={days[4]} />}
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