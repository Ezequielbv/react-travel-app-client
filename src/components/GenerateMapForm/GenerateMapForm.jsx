import React, { useContext, useEffect } from 'react';
import { LocationFormContext } from '../../context/location-form.context';
import mapboxgl from 'mapbox-gl';
import './GenerateMapForm.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;

function GenerateMapForm() {
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
                center: [13.4, 52.5],
                zoom: 5
            })
            mapboxMap.flyTo(
                { center: [latHomeMap, longHomeMap], zoom: 12 }
            )
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
        }
        initializeMap();
    }, [latHomeMap, longHomeMap]);

    return (
        <div className="form-page-map map-container">
            <div id="mapbox-home" />
        </div>
    )
}

export default GenerateMapForm;