import { useRef, useState, useEffect, Children } from 'react';
import PropTypes from 'prop-types';
import tt from '@tomtom-international/web-sdk-maps'; // npm i @tomtom-international/web-sdk-maps
import "@tomtom-international/web-sdk-maps/dist/maps.css";

//{[long, lat]: center}
const PlacesOfInterestMap = ( { coordinates } ) => {
    const mapElement = useRef();
    const { lon, lat } = coordinates;
    // console.log(`lon: ${lon} & lat: ${lat}`);
    const mapLongitude = lon;
    const mapLatitude =  lat;
    const mapZoom = 10;
    const [map, setMap] = useState({});

    //TODO: only allow api call when on this page somehow
    useEffect(() => {
        let map = tt.map({
            key: "njW4ZCADzcu7S4kziEXCbmzhdkoQVbmq",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom,
        });
        setMap(map);
        return () => map.remove();
    }, [coordinates]);

    return (
        <>
            <div
                ref={mapElement}
                className="mapDiv"
                style={{ height: "500px" }} /* This height value can be set to whatever you need} */
            />
        </>
    );
}

PlacesOfInterestMap.propTypes = {
    coordinates: PropTypes.object.isRequired
}

PlacesOfInterestMap.defaultProps = {
    coordinates: {
        lat: 37.36765,
        lon: -121.91599
    }
}

export default PlacesOfInterestMap;