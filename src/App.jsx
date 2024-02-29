import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getWeatherService } from './utils/services';
import './css/site.css'
import HomePage from './components/HomePage/HomePage';
import LocationInformation from './components/LocationInformation/LocationInformation'
import FavouriteLocations from './components/FavouriteLocations/FavouriteLocations';


const App = () => {

    const [searchBarText, setSearchBarText] = useState('');
    const [weatherData, setWeatherData] = useState([]);

    const getWeatherData = async (location) => {
        const data = await getWeatherService(location);
        if (data instanceof Error) {
            return setWeatherData([]);
        }
        setWeatherData(data);
    };

    // useEffect(() => {
    //     console.log(`In useEffect`);
    //     getWeatherData(searchBarText);
    // }, [searchBarText]);



    return (
        <Router>
            <>
                <HomePage searchData={{ searchBarText }} updateSearch={{ setSearchBarText }} />
                <LocationInformation location={searchBarText} weatherData={weatherData} />
                {/* <FavouriteLocations /> */}
            </>
        </Router>
    );
};

export default App;
