// site logo from: <a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Blackonion02 - Flaticon</a>
//Structure of navigation bar generated by Copilot
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

const Header = ({ savedLocations, handleLocationLinkClick }) => {

  let favouriteLocationLinks = [];
  let i = 0;
  savedLocations.forEach(location => {
    favouriteLocationLinks.push(
      <NavLink
        key={i++}
        to={'/weather'}
        className={'dropdown-item'}
        onClick={(e) => {
          e.preventDefault();
          handleLocationLinkClick(location)
        }}
      >{location}</NavLink>
    );
  });

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
              {savedLocations.length > 0 &&
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
                      {savedLocations.length > 0 && favouriteLocationLinks}
                    </div>
                  </li>
                </>}
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

Header.propTypes = {
  savedLocations: PropTypes.array.isRequired,
  handleLocationLinkClick: PropTypes.func.isRequired
}

Header.defaultProps = {
  
}

export default Header;