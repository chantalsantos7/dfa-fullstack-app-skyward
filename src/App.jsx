import { Children, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getWeatherService, getFavouriteLocationsService } from './utils/services';
import './css/site.css'
import HomePage from './components/HomePage/HomePage';
import LocationInformation from './components/LocationInformation/LocationInformation'
import FavouriteLocations from './components/FavouriteLocations/FavouriteLocations';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {

    const [searchBarText, setSearchBarText] = useState('');
    const [weatherData, setWeatherData] = useState({});

    const [hasSavedLocations, setHasSavedLocations] = useState(false);

    
    const checkHasSavedLocations = () => {
        const savedLocations = getFavouriteLocationsService();
        if (savedLocations && savedLocations.length > 0) {
            setHasSavedLocations(true);
            console.log('hi! I was called!')
            return;
        }
        setHasSavedLocations(false);
    }

    const getWeatherData = async (location) => {
        location = location.toLowerCase();
        const data = await getWeatherService(location);
        console.log(data);
        if (data instanceof Error) {
            return setWeatherData({});
        }
        setWeatherData(data);
    };

    const submitLocation = (location) => {
        /*
        1. get weather forecast for the location being searched for
        2. switch to the location information page (passing along the location information as a prop)
        */
        getWeatherData(location);
    }

    useEffect(() => {
        document.title = "Weather Anywhere";
    }, []);

    useEffect(() => {
        checkHasSavedLocations();
    }, [hasSavedLocations]);

    return (

        <>

            <Router>
                <Header hasSavedLocations={hasSavedLocations} />
                <Routes>

                    <Route
                        index
                        path='/'
                        element={
                            <HomePage searchData={{ searchBarText }} updateSearch={{ setSearchBarText }} submitLocation={submitLocation} />
                        }>
                    </Route>
                    <Route
                        path='/weather'
                        element={
                            <LocationInformation searchData={{ searchBarText }} weatherData={weatherData} checkHasSavedLocations={checkHasSavedLocations} />
                        }>

                    </Route>
                    <Route
                        path='/favourites'
                        element={
                            <FavouriteLocations checkHasSavedLocations={checkHasSavedLocations} />
                        }>

                    </Route>
                </Routes>
            </Router>
            <Footer />
        </>
    );
};

export default App;
