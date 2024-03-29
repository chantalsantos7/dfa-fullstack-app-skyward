import { useRef, useState, useEffect, Children } from 'react';
import PropTypes from 'prop-types';
import tt from '@tomtom-international/web-sdk-maps';
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { getPoIForLocationService } from '../../services/placesService';

const PlacesOfInterestMap = ({ coordinates }) => {
    const mapElement = useRef();
    const { lon, lat } = coordinates;
    const mapLongitude = lon;
    const mapLatitude = lat;
    const mapZoom = 11;
    const [map, setMap] = useState(null);
    // const [placesOfInterestArray, setPlacesOfInterestArray] = useState([]);

    useEffect(() => {
        const mapInstance = tt.map({
            key: "njW4ZCADzcu7S4kziEXCbmzhdkoQVbmq",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom,
        });
        setMap(mapInstance);



        return () => mapInstance.remove();
    }, [coordinates]);

    useEffect(() => {
        const fetchPlacesOfInterest = async () => {
            const placesOfInterestArray = await getPoIForLocationService(mapLongitude, mapLatitude);
            console.log(placesOfInterestArray);
            if (placesOfInterestArray && placesOfInterestArray.length > 0) {
                const markers = placesOfInterestArray.map(place => {
                    return new tt.Marker().setLngLat([place.lon, place.lat]);
                });
    
                markers.forEach(marker => {
                    marker.addTo(map);
                });
            }
        };
        if (map) {
            fetchPlacesOfInterest();
        }
        
       
    }, [map, mapLongitude, mapLatitude]);

    return (
        <>
            <div
                ref={mapElement}
                className="mapDiv"
                style={{ height: "450px" }} /* This height value can be set to whatever you need} */
            />

            <div style={{ height: "100px" }}></div>
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