import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
    const [savedLocations, setSavedLocations] = useState([]);
    const navigate = useNavigate();

    const checkHasSavedLocations = () => {
        const savedFaves = getFavouriteLocationsService();
        if (savedFaves && savedFaves.length > 0) {
            setHasSavedLocations(true);
            setSavedLocations(savedFaves);
            return;
        }
        setHasSavedLocations(false);
    }

    const getWeatherData = async (location) => {
        location = location.toLowerCase();
        const data = await getWeatherService(location);
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

    const handleLocationLinkClick = (location) => {
        // If on the home page, it only sets the search bar text to the location, does not go to the location page
        setSearchBarText(location);
        submitLocation(location);
        
        navigate('/weather');
    }

    useEffect(() => {
        document.title = "Skyward";
    }, []);

    useEffect(() => {
        checkHasSavedLocations();
    }, [hasSavedLocations]);

    return (

        <>

            
                <Header savedLocations={savedLocations} handleLocationLinkClick={handleLocationLinkClick} />
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
                            <FavouriteLocations checkHasSavedLocations={checkHasSavedLocations} handleLocationLinkClick={handleLocationLinkClick} />
                        }>

                    </Route>
                </Routes>
            
            <Footer />
        </>
    );
};

export default App;
