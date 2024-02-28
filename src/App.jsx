import { useState } from 'react';
import './css/site.css'
import HomePage from './components/HomePage/HomePage';
import LocationInformation from './components/LocationInformation/LocationInformation'
import FavouriteLocations from './components/FavouriteLocations/FavouriteLocations';


const App = () => {
    
    const [searchBarText, setSearchBarText] = useState('');

    return(
    <>
        <HomePage searchData={{searchBarText}} updateSearch={{setSearchBarText}} />
            {/* <LocationInformation />
            <FavouriteLocations /> */}
    </>
    );
};

export default App;
