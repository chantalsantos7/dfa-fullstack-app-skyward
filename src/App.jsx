import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getWeatherService } from './utils/services';
import './css/site.css'
import HomePage from './components/HomePage/HomePage';
import LocationInformation from './components/LocationInformation/LocationInformation'
import FavouriteLocations from './components/FavouriteLocations/FavouriteLocations';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
    
    const [searchBarText, setSearchBarText] = useState('');
    const [weatherData, setWeatherData] = useState({});

    const getWeatherData = async (location) => {
        location = location.toLowerCase();
        const data = await getWeatherService(location);
        console.log(data);
        if (data instanceof Error) {
            //render an element saying can't find that city, could you type it again?
            return setWeatherData({});
        }
        // console.log(`from App.jsx: ` + data);
        setWeatherData(data);
    };

    const submitLocation = (location) => {
        /*
        1. get weather forecast for the location being searched for
        2. switch to the location information page (passing along the location information as a prop)
        */
        console.log(`${location} is being searched for`);
        getWeatherData(location); 
    }

    useEffect(() => {
        document.title = "Weather Anywhere";
    }, []);

    return (
        
        <>
       
            <Router>
                <Header />
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
                        <LocationInformation searchData={ { searchBarText }} weatherData={weatherData} />
                    }>
                        
                    </Route>
                   <Route
                   path='/favourites'
                   element={
                    <FavouriteLocations />
                   }>
                     
                   </Route>
                </Routes>
            </Router>
            <Footer />
        </>
    );
};

export default App;
