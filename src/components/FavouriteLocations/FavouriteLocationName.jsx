import PropTypes from 'prop-types'
const FavouriteLocationName = ({ location }) => {
  return (
    <>
      <div className="row favourite-location">
        <div className="col-6 bookmark-icon d-block">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
          </svg>
        </div>
        <div className="col-6">
          <a className='favourite-location-link' href="http://">{location}</a>
        </div>
      </div>
    </>
  )
}

FavouriteLocationName.PropTypes = {
  location: PropTypes.string.isRequired
}

FavouriteLocationName.defaultProps = {
  location: "default name"
}

export default FavouriteLocationName