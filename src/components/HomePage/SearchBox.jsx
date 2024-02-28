
const SearchBox = () => {
  return (
    <>
      <div className="container mt-5 text-center">
        <div className="row mt-5 mb-3">
          <h1 className="tell-me-about-text thestral-header">Tell me about...</h1>
        </div>

        <div className="input-group">
          <div className="container">
            <div className="row mt-2 mb-3 d-flex justify-content-center align-items-center">
    
              <input className="search-input form-control" type="search" name="" id="" placeholder="Enter a location name..." />
    
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

export default SearchBox;