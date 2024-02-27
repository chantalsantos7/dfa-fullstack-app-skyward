import PropTypes from 'prop-types'

const TellYouLocation = ({displayString}) => {
    return (
        <>
            <div className="container">
                <div className="row mt-5">

                    <div className="col-12 text-center">
                        <h1 className="tell-me-about-text">Telling you about...</h1>
                    </div>

                    <div className='col-12 text-center'>
                        <h1 className="location-text">{displayString}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

TellYouLocation.PropTypes = {
    displayString: PropTypes.string.isRequired,
  };
  
TellYouLocation.defaultProps = {
    displayString: "Default location"
  }


export default TellYouLocation;