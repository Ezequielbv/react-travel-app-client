import React, { useContext, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { LocationFormContext } from '../../context/location-form.context';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './GenerateMapHome.css'

/*  Declare tokens and API URL  */
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;

function GenerateMapHome() {
    const { latHomeMap, longHomeMap } = useContext(LocationFormContext);

    useEffect(() => {
        if (!latHomeMap || !longHomeMap) {
            return
        }
        console.log('latitude updated:', latHomeMap)
        console.log('longitude updated:', longHomeMap)

        function initializeMap() {
            const mapboxMap = new mapboxgl.Map({
                container: "mapbox-home",
                style: "mapbox://styles/micaela-rosadio/clbjpb0wp006c14r3d53924fz",
                center: [latHomeMap, longHomeMap],
                zoom: 5
            })
            console.log(mapboxMap)
            mapboxMap.addControl(new mapboxgl.NavigationControl());
            mapboxMap.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    // When active the map will receive updates to the device's location as it changes.
                    trackUserLocation: true,
                    // Draw an arrow next to the location dot to indicate which direction the device is heading.
                    showUserHeading: true
                })
            );
            // Add the control to the map.
           const geocoder = mapboxMap.addControl(
                new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl,
                    language:       'en-EN',
                })
            );
            console.log(geocoder)

        }
        initializeMap();
    }, [latHomeMap, longHomeMap]);

    return (
        <div>
            <div id="mapbox-home" />
        </div>
    )
}

export default GenerateMapHome;