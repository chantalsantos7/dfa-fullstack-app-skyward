import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { getWeatherService, getFavouriteLocationsService } from './utils/services';
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
        location = location.toLowerCase();
        const data = await getWeatherService(location);
        if (data instanceof Error) {
            console.log(`getWeatherData has an error`)
            return setWeatherData({});
        }

        let foundDayData = initialiseDayData(data);
        setWeatherData({ dayData: foundDayData });
    };

    const submitLocation = (location) => {
        /*
        1. get weather forecast for the location being searched for
        2. switch to the location information page (passing along the location information as a prop)
        */
        // checkHasSavedLocations();
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

    

    return (

        <>
{/* savedLocations={savedLocations}  */}

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
                                <LocationInformation searchData={{ searchBarText }} weatherData={weatherData} />
                            }>
    
                        </Route>
                        {/* <Route
                            path='/favourites'
                            element={
                                <FavouriteLocations checkHasSavedLocations={checkHasSavedLocations} handleLocationLinkClick={handleLocationLinkClick} />
                            }>
    
                        </Route> */}
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
