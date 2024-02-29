import PropTypes from 'prop-types'
import Footer from '../Footer'
import Header from '../Header'
import SearchBox from './SearchBox'
import "./css/homepage.css"
//background image from: https://unsplash.com/photos/vehicle-parking-in-front-of-building-X2ovoIk6ISQ?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash

const HomePage = ( { searchData, updateSearch } ) => {
  return (
    <>
      <Header />
      <div className="container home-page-container">
        <div className="row mb-5">
          <div className="d-flex justify-content-center align-items-center">
            <SearchBox searchData={searchData} updateSearch={updateSearch} />
          </div>
        </div>   
      </div>
 <Footer />
    </>
  )
}

HomePage.propTypes = {
  searchData: PropTypes.exact( {
    searchBarText: PropTypes.string.isRequired
  }).isRequired,
  updateSearch: PropTypes.exact( {
    setSearchBarText: PropTypes.func.isRequired
  }).isRequired
};

export default HomePage