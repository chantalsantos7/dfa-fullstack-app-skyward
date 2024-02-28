import PropTypes from 'prop-types';
const SearchBox = ({ searchData, updateSearch }) => {
  const { searchBarText } = searchData;
  const { setSearchBarText } = updateSearch;

  return (
    <>
      <div className="container mt-5 text-center">
        <div className="row mt-5 mb-3">
          <h1 className="tell-me-about-text thestral-header">Tell me about...</h1>
        </div>

        <div className="input-group">
          <div className="container">
            <div className="row mt-2 mb-3 d-flex justify-content-center align-items-center">

              <input
                className="search-input form-control"
                type="search"
                name="search" 
                id="search"
                value={searchBarText}
                onChange={(e) => setSearchBarText(e.target.value)}
                placeholder="Enter a location name..." />

            </div>

            <div className="row mt-1 justify-content-center">
              <button className="btn btn-submit btn-lg" type="submit">Search</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

SearchBox.propTypes = {
  searchData: PropTypes.exact( {
    searchBarText: PropTypes.string.isRequired
  }).isRequired,
  updateSearch: PropTypes.exact( {
    setSearchBarText: PropTypes.func.isRequired
  }).isRequired
};

export default SearchBox;