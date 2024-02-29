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
        location = location.toLowerCase();
        const data = await getWeatherService(location);
        if (data instanceof Error) {
            return setWeatherData([]);
        }
        console.log(data);
        setWeatherData(data);
    };

    const submitLocation = (location) => {
        console.log(`${location} is being searched for`);
        getWeatherData(location);
    }

    // useEffect(() => {
    //     console.log(`In useEffect`);
    //     getWeatherData(searchBarText);
    // }, [searchBarText]);



    return (
        <Router>
            <Routes>
                <Route
                index
                element={
                     <HomePage searchData={{ searchBarText }} updateSearch={{ setSearchBarText }} submitLocation={submitLocation} />
                }>
                </Route>
                <Route
                path='search'
                element={
                    <LocationInformation location={searchBarText} weatherData={{ weatherData }} />
                }>
                    
                </Route>
                {/* <FavouriteLocations /> */}
            </Routes>
        </Router>
    );
};

export default App;
