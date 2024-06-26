import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getWeatherService } from './services/weatherServices';
import { formatTemperature } from './utils/formatting';
import './css/site.css'
import HomePage from './components/HomePage/HomePage';
import LocationInformation from './components/LocationInformation/LocationInformation'
import FavouriteLocations from './components/FavouriteLocations/FavouriteLocations';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpPage from './components/AuthForms/SignUpPage';
import LoginPage from './components/AuthForms/LoginPage';
import PasswordChangePage from './components/AuthForms/PasswordChangePage';
import { AuthProvider } from './contexts/AuthContext';
import { FavesProvider } from './contexts/FavesContext';


const App = () => {

    const navigate = useNavigate();
    const appLocation = useLocation();
    // const footerStyle = appLocation.pathname === '/weather' ? { marginTop: 'auto' } : {};
    const [searchBarText, setSearchBarText] = useState('');

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
        // const locationString = location;
        const data = await getWeatherService(location.toLowerCase());
        if (data instanceof Error) {
            console.log(`getWeatherData has an error`)
            return setWeatherData({});
        }
        // console.log(data);
        let foundDayData = initialiseDayData(data);
        const {lat, lon } = data.city.coord;
        setWeatherData({coords: {lat: lat, lon: lon}, location: location, dayData: foundDayData });
    };

    const submitLocation = (location) => {
        getWeatherData(location);
    }

    const handleLocationLinkClick = (location) => {
        submitLocation(location);

        navigate('/weather');
    }

    useEffect(() => {
        document.title = "Skyward";
    }, []);

    useEffect(() => {
        if (weatherData.location !== undefined) {
            getWeatherData(weatherData.location);
        }
        

        const intervalId = setInterval(() => {
            
            if (weatherData.location !== undefined) {
                getWeatherData(weatherData.location);
            }
        
        }, 600000);

        return () => clearInterval(intervalId);
    }, [weatherData.location]);

    return (

        <>

            <AuthProvider>
                <FavesProvider>
                    <Header handleLocationLinkClick={handleLocationLinkClick} searchData={{ searchBarText }} updateSearch={{ setSearchBarText }} submitLocation={submitLocation} />
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
                                <LocationInformation searchData={{ searchBarText }} weatherData={weatherData} updateWeatherData={getWeatherData} />
                            }>

                        </Route>
                        <Route
                            path='/favourites'
                            element={
                                <FavouriteLocations handleLocationLinkClick={handleLocationLinkClick} />

                            }>

                        </Route>
                        <Route
                            path='/signup'
                            element={
                                <SignUpPage />
                            }
                        >
                        </Route>
                        <Route
                            path='/login'
                            element={
                                <LoginPage />
                            }
                        >
                        </Route>

                        <Route
                            path='/password-change'
                            element={
                                <PasswordChangePage />
                            }
                        >
                        </Route>

                    </Routes>

                    <Footer />
                </FavesProvider>
            </AuthProvider>
        </>
    );
};

export default App;
