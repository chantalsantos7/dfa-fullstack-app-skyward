import { useState } from "react";
import { Navigate } from "react-router-dom";
const SearchBar = ({ searchData, updateSearch, submitLocation }) => {

    const [submitted, setSubmitted] = useState(false);
    const { searchBarText } = searchData;
    const { setSearchBarText } = updateSearch;

    const handleSubmit = () => {
        event.preventDefault();
        submitLocation(searchBarText);
        setSubmitted(true);
    }

    return (
        <>
            {submitted && <Navigate to="/weather" />}
            <div className="input-group search-bar-container">
                <form onSubmit={handleSubmit}>
                    <input type="search" name="header-search" id="header-search" className="header-search-bar"
                        onChange={(e) => setSearchBarText(e.target.value)}
                        placeholder='Location search...' />

                    <input type="submit" value="" className="header-search-button" />
                </form>
            </div>
        </>
    )
}


export default SearchBar