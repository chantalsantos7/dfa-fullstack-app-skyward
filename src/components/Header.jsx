// site logo from: <a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Blackonion02 - Flaticon</a>
//Structure of navigation bar generated by Copilot

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg mt-0">
        <a className="navbar-brand" href="#">
          <img src="src/assets/siteLogo.png" alt=""></img>
        </a>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <img src="src/assets/icons8-hamburger-menu.svg" alt="menu icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                My Saved Locations
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>



      {/* <header class="container">
        <div className="row">
          <div className="site-logo col-2">
            <img src="src/assets/siteLogo.png" alt="" />
            <div className="nav-bar col-10">
              <Navigation />
            </div>
          </div>
        </div>

      </header> */}

    </>
  )
}

export default Header;