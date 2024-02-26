import Footer from '../Footer'
import Header from '../Header'
import SearchBox from './SearchBox'
import "./css/homepage.css"
//background image from: https://unsplash.com/photos/vehicle-parking-in-front-of-building-X2ovoIk6ISQ?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row mb-5">
          <div className="d-flex justify-content-center align-items-center vh-90">
            <SearchBox />
          </div>
        </div>
        <div className="row mt-5">
          <Footer />
        </div>
      </div>




    </>
  )
}

export default HomePage