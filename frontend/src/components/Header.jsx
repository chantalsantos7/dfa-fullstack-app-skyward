// site logo from: <a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Blackonion02 - Flaticon</a>
//Structure of navigation bar generated by Copilot
import PropTypes from 'prop-types';
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from './SearchBar';
import { useAuth } from '../contexts/AuthContext';
import { useFaves } from '../contexts/FavesContext';
import { useEffect } from 'react';

const Header = ({ handleLocationLinkClick, searchData, updateSearch, submitLocation }) => {

  const { authToken, handleLogout } = useAuth();
  const { favouriteLocations } = useFaves();
  const location = useLocation();
  let favouriteLocationLinks = [];
  let i = 0;


  const handleLogoutLink = (e) => {
    handleLogout();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg mt-0">
        <NavLink
          to='/'
          className="navbar-brand"
        >
          <img src="src/assets/siteLogo.png" alt=""></img>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <img src="src/assets/icons8-hamburger-menu.svg" alt="menu icon" />
        </button>

        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>

          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav flex-grow-1 pe-3">
              <li className="nav-item active">
                <NavLink to='/' className="nav-link">Home</NavLink>
              </li>
              {favouriteLocations.length > 0 &&
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      to='/favourites'
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >My Saved Locations</NavLink>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      {/* Additional link to all saved locations added as default dropdown behaviour by Bootstrap prevents the NavLink from routing to favourites as expected  */}
                      <NavLink
                        to='/favourites'
                        className='dropdown-item'>All Saved Locations</NavLink>
                      {favouriteLocations.map((location, index) => (
                        <NavLink
                          key={index}
                          to={'/weather'}
                          className={'dropdown-item'}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLocationLinkClick(location)
                          }}
                        >{location}</NavLink>
                      ))}
                    </div>
                  </li>
                </>}
              {(authToken === null && location.pathname !== '/login') && <NavLink to="/login" className='nav-link'>Login</NavLink>}
              {(authToken !== null && location.pathname !== '/login') && <NavLink to="/login" className='nav-link' onClick={handleLogoutLink}>Logout</NavLink>}
              {location.pathname !== '/' && <SearchBar searchData={searchData} updateSearch={updateSearch} submitLocation={submitLocation} />}
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

Header.propTypes = {
  // favouriteLocations: PropTypes.array.isRequired,
  handleLocationLinkClick: PropTypes.func.isRequired
}

Header.defaultProps = {

}

export default Header;