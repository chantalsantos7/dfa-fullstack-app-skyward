import axios from 'axios';
import { useState } from 'react';
import { getWeatherService } from '../services/weatherServices';

export const useUpdateWeather = async (location) => {
    const [weatherData, setWeatherData] = useState({});

    const initialiseDayData = (data) => {
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
        return tempDays;
    }

    const getDayIndices = (data) => {
        let dayIndices = [0];
        let currentDay = data.list[0].dt_txt.slice(8, 10);
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

    const getWeatherData = async (location) => {
        const data = await getWeatherService(location.toLowerCase());
        if (data instanceof Error) {
            console.log(`getWeatherData has an error`)
            return setWeatherData({});
        }

        let foundDayData = initialiseDayData(data);
        setWeatherData({ location: location, dayData: foundDayData });
    }

    return [weatherData, setWeatherData];

} 