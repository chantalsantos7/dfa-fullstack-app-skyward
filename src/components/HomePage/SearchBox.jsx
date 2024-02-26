import "./css/homepage.css"

const SearchBox = () => {
  return (
    <>
      <div className="container mt-5 text-center">
        <div className="row mt-5 mb-3">
          //TODO: Add media queries for mobile size to reduce size of these headings
          <h1 className="tell-me-about-text">Tell me about...</h1>
        </div>

        <div className="row mt-2 mb-3">

          <input type="search" name="" id="" placeholder="Enter a location name..." />

        </div>

        <div className="row mt-1 justify-content-center">
          <button type="submit">Search</button>
        </div>
      </div>

    </>
  )
}

export default SearchBox;