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
    const mapZoom = 13;
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

                // markers.forEach(() => {

                // });
                //get name and address from places of interest array
                let poiArrayIndex = 0;
                markers.forEach(marker => {
                    marker.addTo(map);
                    var popupOffsets = {

                        top: [0, 0],
                      
                        bottom: [0, -70],
                      
                        "bottom-right": [0, -70],
                      
                        "bottom-left": [0, -70],
                      
                        left: [25, -35],
                      
                        right: [-25, -35],
                      
                      }
                      
                      var popup = new tt.Popup({ offset: popupOffsets }).setHTML(
                        `${placesOfInterestArray[poiArrayIndex].formatted !== undefined ? placesOfInterestArray[poiArrayIndex].formatted : placesOfInterestArray[poiArrayIndex].name}`
                      )
                      
                      marker.setPopup(popup);
                      poiArrayIndex++;
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