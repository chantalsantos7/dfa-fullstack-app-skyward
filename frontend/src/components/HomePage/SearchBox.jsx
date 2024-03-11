import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const SearchBox = ({ searchData, updateSearch, submitLocation }) => {
 
  const [submitted, setSubmitted] = useState(false);

  const { searchBarText } = searchData;
  const { setSearchBarText } = updateSearch;
  const handleSubmit = event => {
    event.preventDefault();
    submitLocation(searchBarText);
    setSubmitted(true);
  }


  return (
    <>
      {submitted && <Navigate to="/weather" />}
      <div className="container mt-5 text-center">
        <div className="row mt-5 mb-3">
          <h1 className="tell-me-about-text thestral-header">Tell me about...</h1>
        </div>

        <div className="input-group">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row mt-2 mb-3 d-flex justify-content-center align-items-center">

                <input
                  className="search-input form-control"
                  type="search"
                  name="search"
                  id="search"
                  onChange={(e) => setSearchBarText(e.target.value)}
                  placeholder="Enter a location name..." />

              </div>

              <div className="row mt-1 justify-content-center">
                <input type="submit" value="Search" className="btn btn-submit" disabled = {searchBarText === ''} />
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

SearchBox.propTypes = {
  searchData: PropTypes.exact({
    searchBarText: PropTypes.string.isRequired
  }).isRequired,
  updateSearch: PropTypes.exact({
    setSearchBarText: PropTypes.func.isRequired
  }).isRequired,
  submitLocation: PropTypes.func.isRequired
};

export default SearchBox;